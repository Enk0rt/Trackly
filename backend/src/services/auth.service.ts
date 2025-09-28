import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { LoginTypeEnum } from "../enums/login-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { IUser, IUserWithTokens } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(signUpData: Partial<IUser>): Promise<IUser> {
        await userService.isUserUnique(signUpData.email, signUpData.username);

        const password = await passwordService.hashPass(signUpData.password);

        const user = await userService.create({
            ...signUpData,
            password,
        });

        const verifyToken = tokenService.generateActionToken(
            {
                _userId: user._id,
                username: user.username,
                role: user.role,
            },
            ActionTokenTypeEnum.VERIFY,
        );

        await emailService.sendMail(
            user.email,
            emailConstants[EmailEnum.VERIFY],
            {
                name: user.name,
                username: user.username,
                url: `${config.FRONTEND_URL}/verify/${verifyToken}`,
            },
        );

        return user;
    }

    public async signIn(
        signInData: Partial<IAuth>,
        type: LoginTypeEnum,
    ): Promise<IUserWithTokens> {
        if (!signInData?.login || !signInData?.password) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Email or username is required",
                "login",
            );
        }

        let user: IUser;

        switch (type) {
            case LoginTypeEnum.EMAIL:
                user = await userRepository.getByEmail(signInData.login);
                if (!user) {
                    throw new ApiError(
                        StatusCodeEnum.BAD_REQUEST,
                        "Invalid login or password",
                    );
                }
                break;
            case LoginTypeEnum.USERNAME:
                user = await userRepository.getByUsername(signInData.login);
                if (!user) {
                    throw new ApiError(
                        StatusCodeEnum.BAD_REQUEST,
                        "Invalid login or password",
                    );
                }
                break;
            default:
                throw new ApiError(
                    StatusCodeEnum.BAD_REQUEST,
                    "Invalid login or password",
                );
        }

        const isValidPass = await passwordService.comparePass(
            signInData.password,
            user.password,
        );

        if (!isValidPass) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Invalid login or password",
            );
        }

        const tokens = tokenService.generateTokens({
            _userId: user._id,
            username: user.username,
            role: user.role,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async me(id: string): Promise<IUser> {
        const user = await userService.getById(id);
        if (!user) {
            throw new ApiError(
                StatusCodeEnum.UNAUTHORIZED,
                "User is not signed in",
            );
        }
        return user;
    }

    public async updateMe(
        id: string,
        updateData: Partial<IUser>,
    ): Promise<IUser> {
        const user = await userService.getById(id);
        if (!user) {
            throw new ApiError(
                StatusCodeEnum.UNAUTHORIZED,
                "User is not signed in",
            );
        }
        if (!updateData) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "At least one field should be provided",
            );
        }

        return await userService.updateOne(id, updateData);
    }

    public async sendVerifyEmailRequest(
        email: string,
        name: string,
        username: string,
    ): Promise<void> {
        if (!email) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Email is not provided",
            );
        }

        const user = await userService.getByEmail(email);
        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        const verifyToken = tokenService.generateActionToken(
            {
                _userId: user._id,
                username: user.username,
                role: user.role,
            },
            ActionTokenTypeEnum.VERIFY,
        );
        await emailService.sendMail(email, emailConstants[EmailEnum.VERIFY], {
            name,
            username,
            url: `${config.FRONTEND_URL}/verify/${verifyToken}`,
        });
    }

    public async verifyEmail(token: string): Promise<IUser> {
        if (!token) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Verify token is not provided",
            );
        }
        const { _userId } = tokenService.verifyToken(
            token,
            TokenTypeEnum.VERIFY,
        );
        const user = await userService.updateOne(String(_userId), {
            isVerified: true,
        });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        await emailService.sendMail(user.email, emailConstants.WELCOME, {
            name: user.name,
        });

        return user;
    }

    public async sendRecoveryRequest(email: string): Promise<void> {
        const user = await userService.getByEmail(email);

        if (!user) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "User with this email is not signed up",
            );
        }

        const recoveryToken = tokenService.generateActionToken(
            {
                _userId: user._id,
                username: user.username,
                role: user.role,
            },
            ActionTokenTypeEnum.RECOVERY,
        );

        await emailService.sendMail(email, emailConstants[EmailEnum.RECOVERY], {
            name: user.name,
            url: `${config.FRONTEND_URL}/recovery/confirm/${recoveryToken}`,
        });
    }

    public async recoverPasswordFromEmail(
        token: string,
        newPass: string,
    ): Promise<IUser> {
        if (!token) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Recovery token is not provided",
            );
        }

        const { _userId } = tokenService.verifyToken(
            token,
            TokenTypeEnum.RECOVERY,
        );

        const user = await userService.getById(String(_userId));

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        const password = await passwordService.hashPass(newPass);

        const isSame = await passwordService.comparePass(
            newPass,
            user.password,
        );

        if (isSame) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "This password have already been in use recently, come up with new one",
            );
        }

        const updatedUser = await userService.updateOne(String(_userId), {
            password,
        });

        await emailService.sendMail(
            updatedUser.email,
            emailConstants[EmailEnum.RECOVERY_SUCCESS],
            {
                name: updatedUser.name,
            },
        );

        return updatedUser;
    }

    public async changePasswordFromProfile(
        token: string,
        oldPass: string,
        newPass: string,
    ): Promise<IUser> {
        if (!token) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Access token is not provided",
            );
        }

        const { _userId } = tokenService.verifyToken(
            token,
            TokenTypeEnum.ACCESS,
        );

        const hashedOldPass = await passwordService.hashPass(oldPass);
        if (!(await passwordService.comparePass(oldPass, hashedOldPass))) {
            throw new ApiError(StatusCodeEnum.FORBIDDEN, "Invalid password");
        }

        const newHashedPassword = await passwordService.hashPass(newPass);

        const user = await userService.updateOne(String(_userId), {
            password: newHashedPassword,
        });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        await emailService.sendMail(
            user.email,
            emailConstants[EmailEnum.RECOVERY_SUCCESS],
            {
                name: user.name,
            },
        );

        return user;
    }
}

export const authService = new AuthService();
