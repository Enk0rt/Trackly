import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/tokens.interface";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });

        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public generateActionToken(
        payload: ITokenPayload,
        type: ActionTokenTypeEnum,
    ): string {
        let secret: string;
        let expiresIn: any;

        switch (type) {
            case ActionTokenTypeEnum.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            case ActionTokenTypeEnum.VERIFY:
                secret = config.JWT_VERIFY_SECRET;
                expiresIn = config.JWT_VERIFY_LIFETIME;
                break;
            default:
                throw new ApiError(
                    StatusCodeEnum.BAD_REQUEST,
                    "Invalid action token type",
                );
        }
        return jwt.sign(payload, secret, { expiresIn });
    }

    public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case TokenTypeEnum.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                case TokenTypeEnum.VERIFY:
                    secret = config.JWT_VERIFY_SECRET;
                    break;
                default:
                    throw new ApiError(
                        StatusCodeEnum.BAD_REQUEST,
                        "Invalid action token type",
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch {
            throw new ApiError(StatusCodeEnum.UNAUTHORIZED, "Invalid token");
        }
    }
}

export const tokenService = new TokenService();
