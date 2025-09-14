import { LoginTypeEnum } from "../enums/login-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { IUser, IUserWithTokens } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(signUpData: Partial<IUser>): Promise<IUser> {
        await userService.isUserUnique(signUpData.email, signUpData.username);

        const password = await passwordService.hashPass(signUpData.password);

        return await userService.create({
            ...signUpData,
            password,
        });
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

        return await userService.update(id, updateData);
    }
}

export const authService = new AuthService();
