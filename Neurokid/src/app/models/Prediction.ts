import { User } from "./User";

export class Prediction {
    predictionId:number = 0;
    predictionScore: number = 0;
    explanationText: string = "";
    predictedAt: Date = new Date();
    usuario: User = new User();
}