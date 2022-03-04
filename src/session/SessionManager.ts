export interface SessionManager{
    timeToExpire: number;

    constructor:Function

    getUserId:(token:string)=>Promise<number>

    create:(userId:number)=>Promise<string>

    delete:(token:string)=>Promise<void>
}
