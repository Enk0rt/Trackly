import { LoginTypeEnum } from "../enums/login-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { IUser, IUserWithTokens } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
    public async signUp(signUpData: Partial<IUser>): Promise<IUser> {
        const [userByEmail, userByUsername] = await Promise.all([
            userRepository.getByEmail(signUpData.email),
            userRepository.getByUsername(signUpData.username),
        ]);

        if (userByEmail) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "User with this email already exists",
            );
        }

        if (userByUsername) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "User with this username already exists",
            );
        }
        const password = await passwordService.hashPass(signUpData.password);

        return await userRepository.create({
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
            );
        }

        let user: IUser;

        switch (type) {
            case LoginTypeEnum.EMAIL:
                user = await userRepository.getByEmail(signInData.login);
                if (!user) {
                    throw new ApiError(
                        StatusCodeEnum.BAD_REQUEST,
                        "Invalid email/username or password",
                    );
                }
                break;
            case LoginTypeEnum.USERNAME:
                user = await userRepository.getByUsername(signInData.login);
                if (!user) {
                    throw new ApiError(
                        StatusCodeEnum.BAD_REQUEST,
                        "Invalid email/username or password",
                    );
                }
                break;
            default:
                throw new ApiError(
                    StatusCodeEnum.BAD_REQUEST,
                    "Invalid email/username or password",
                );
        }

        const isValidPass = await passwordService.comparePass(
            signInData.password,
            user.password,
        );

        if (!isValidPass) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Invalid email or password",
            );
        }

        const tokens = tokenService.generateTokens({
            _userId: user._id,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }
}

export const authService = new AuthService();
