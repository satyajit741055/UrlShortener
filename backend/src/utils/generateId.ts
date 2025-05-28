import { nanoid } from 'nanoid'


export const generateId = (length:any) =>{
    const id = nanoid(length);
    return id;

}