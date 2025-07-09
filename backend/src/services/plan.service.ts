import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IPlan } from "../interfaces/plan.interface";
import { planRepository } from "../repositories/plan.repository";
import { getOrCreateUserActivity } from "../utils/getOrCreateTodayActivity";

class PlanService {
    public async getAll(): Promise<IPlan[]> {
        return await planRepository.getAll();
    }

    public async getById(id: string): Promise<IPlan> {
        const plan = await planRepository.getById(id);

        if (!plan) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Plan is not found");
        }
        return plan;
    }

    public async create(createData: Partial<IPlan>): Promise<IPlan> {
        const userActivity = await getOrCreateUserActivity(createData._userId);
        const plan = await planRepository.create(createData);
        userActivity.plans.push(plan._id);
        await userActivity.save();
        return plan;
    }

    public async update(
        id: string,
        updateData: Partial<IPlan>,
    ): Promise<IPlan> {
        const plan = await planRepository.update(id, updateData);
        if (!plan) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Plan is not found");
        }
        return plan;
    }

    public async delete(id: string): Promise<IPlan> {
        const plan = await planRepository.delete(id);

        if (!plan) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Plan is not found");
        }
        return plan;
    }
}

export const planService = new PlanService();
