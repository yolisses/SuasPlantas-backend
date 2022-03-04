export interface SessionManager{
    timeToExpire: number;

    constructor:Function

    getUserId:(token:string)=>Promise<number|undefined>

    create:(userId:number)=>Promise<string>

    delete:(token:string)=>Promise<void>
}
