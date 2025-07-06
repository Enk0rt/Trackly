import { IPlan } from "../interfaces/plan.interface";
import { Plan } from "../models/plan.model";

class PlanRepository {
    public getAll(): Promise<IPlan[]> {
        return Plan.find();
    }

    public getById(id: string): Promise<IPlan> {
        return Plan.findById(id);
    }

    public create(createData: Partial<IPlan>): Promise<IPlan> {
        return Plan.create(createData);
    }

    public update(id: string, updateData: Partial<IPlan>): Promise<IPlan> {
        return Plan.findByIdAndUpdate(id, updateData);
    }

    public delete(id: string): Promise<void> {
        return Plan.findByIdAndDelete(id);
    }
}

export const planRepository = new PlanRepository();
