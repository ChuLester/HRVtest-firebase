import {heartmodel} from "./heart.model."
import {HRV} from "./calHRV";
export class Queue{

    
    private queue =new Array<heartmodel>();
    
    constructor(){}

    public getlength():number{
        return this.queue.length;
    }

    public mean():number{
        let sum = 0;
        for (let i of this.queue){
            sum = sum + i.getIBI();
        }
        return Math.round(sum / this.getlength());
    }

    public push(model:heartmodel){
        this.queue.push(model);
        //console.log('Queue push');
    }
    public shift(){
        this.queue.shift();
    }
    public toNumberArray():Array<number>{
        let result = new Array<number>();
        for (let i in this.queue){
            result[i] = this.queue[i].getIBI();
        }
        return result;
    }
    public clear(){
        this.queue = [];
        console.log('Queue clear');
    }
}