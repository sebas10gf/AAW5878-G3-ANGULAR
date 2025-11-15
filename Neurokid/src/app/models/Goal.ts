import { User } from "./User"

export class Goal{
    goalId:number = 0
    user:User = new User()
    goalDescription:string = ""
    startDate:Date = new Date()
    endDate:Date = new Date()
    status:boolean = false
}