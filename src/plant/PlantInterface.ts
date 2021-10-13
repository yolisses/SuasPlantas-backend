import { Tag } from 'tag/Tag';

export interface IPlantInfo{
    name:string
    description?:string
    price?:number
    swap:boolean
    donate:boolean
    amount?:number
    tags:Tag[]
}
