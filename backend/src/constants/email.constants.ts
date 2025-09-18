import { EmailEnum } from "../enums/email.enum";
import { IEmailConstants } from "../interfaces/email.interface";

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.VERIFY]: {
        subject: "Verify email",
        template: "verify",
    },
    [EmailEnum.RECOVERY]: {
        subject: "Recover password",
        template: "recovery",
    },
    [EmailEnum.RECOVERY_SUCCESS]: {
        subject: "Recover password",
        template: "recovery",
    },
};
