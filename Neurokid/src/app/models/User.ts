export class User{
    userId:number=0
    username:string=""
    email:string=""
    passwordHash:string=""
    createdAt:Date= new Date()
    updatedAt:Date= new Date()
    enabled:boolean=false
}