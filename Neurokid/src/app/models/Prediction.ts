import { Symptomslog } from "./SymptomsLog";

export class Prediction {
    predictionId:number = 0;
    predictionScore: number = 0;
    explanationText: string = "";
    predictedAt: Date = new Date();
    log:Symptomslog = new Symptomslog();
}