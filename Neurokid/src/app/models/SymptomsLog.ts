import { User } from "./User"

export class Symptomslog{
    logId:number = 0
    user:User = new User()
    moodEntry:string = ""
    symptomNotes:string = ""
    logDate:Date = new Date
}