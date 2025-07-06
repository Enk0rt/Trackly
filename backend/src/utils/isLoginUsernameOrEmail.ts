import { LoginTypeEnum } from "../enums/login-type.enum";
import { RegexEnums } from "../enums/regex.enum";

export const isLoginUsernameOrEmail = (login: string): LoginTypeEnum => {
    if (login.match(RegexEnums.EMAIL)) {
        return LoginTypeEnum.EMAIL;
    }
    return LoginTypeEnum.USERNAME;
};
