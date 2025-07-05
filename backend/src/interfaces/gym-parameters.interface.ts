import { IBase } from "./base.interface";
import { IBodyMeasure } from "./body-measure.interface";
import { IExerciseResult } from "./exercise-result.interface";

export interface IGymParameters extends IBase {
    bodyMeasures: IBodyMeasure[];
    strength: IExerciseResult[];
}
