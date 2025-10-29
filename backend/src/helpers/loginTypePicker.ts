import { LoginTypeEnum } from "../enums/login-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const loginTypePicker = async (
    type: LoginTypeEnum,
    signInData: Partial<IAuth>,
): Promise<IUser> => {
    let user: IUser;

    switch (type) {
        case LoginTypeEnum.EMAIL:
            user = await userRepository.getByEmail(signInData.login);
            if (!user) {
                throw new ApiError(
                    StatusCodeEnum.UNAUTHORIZED,
                    "Invalid login or password",
                );
            }
            break;
        case LoginTypeEnum.USERNAME:
            user = await userRepository.getByUsername(signInData.login);
            if (!user) {
                throw new ApiError(
                    StatusCodeEnum.UNAUTHORIZED,
                    "Invalid login or password",
                );
            }
            break;
        default:
            throw new ApiError(
                StatusCodeEnum.UNAUTHORIZED,
                "Invalid login or password",
            );
    }

    return user;
};
