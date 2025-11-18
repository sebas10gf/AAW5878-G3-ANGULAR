import { Questions } from "./Questions";
import { User } from "./User";

export class QuestionAnswers {
    answer_id:number = 0;
    answer_value:number = 0;
    answered_at:Date = new Date();
    user: User = new User();
    question: Questions = new Questions();
}