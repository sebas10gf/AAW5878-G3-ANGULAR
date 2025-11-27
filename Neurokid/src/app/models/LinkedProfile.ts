import { User } from "./User"

export class LinkedProfile {
    linkId:number = 0;
    tutor:User = new User();
    child:User = new User();
    professional:User = new User();
    status:boolean = false;
}