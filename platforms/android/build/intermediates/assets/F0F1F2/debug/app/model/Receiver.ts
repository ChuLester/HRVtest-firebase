import { heartmodel } from './heart.model.';
import { Queue } from './Queue';
import { HRV } from './calHRV';
import { AppComponent } from '../app.component';
import {HRVmodel} from './HRVmodel';
import firebase =  require('nativescript-plugin-firebase');
export class Receiver{

    private list = new Queue;
    private tmp:number;
    private hrv = new HRV;
    private beforeIBI:number = 0;
    private tmpdata:number;
    private model:HRVmodel;
    private dataname:string = Date.now().toLocaleString();
    public process(){  
        //console.log('process');
        if(this.isNotFill()){
            this.Store();
        } else {
            this.hrv.setQueue(this.list);
            this.model=this.hrv.calHRV();
            this.writeFile();
            this.outData();
            this.Store();
        }
    }
    public receive(data:Uint8Array){
        //console.log('receive');
        this.tmpdata = data[0] * 256+ data[1];
        if (this.tmpdata != this.beforeIBI){
        this.process();
        }
    }

    private outData(){
        console.log('outData');
        for(let i = 0;i < 10;i++){
            this.list.shift();
        }
    }

    private isNotFill():boolean{      //we only need 256 data to calculate,so length < 256
        //console.log('isNotFill');
        if(this.list.getlength() >= 256){
            return false;
        } else {
            
            return true;
        }
    }
    private Store(){
        //console.log('Store');
        this.list.push(new heartmodel(this.tmpdata));
        this.beforeIBI = this.tmpdata;
    }
    public getIBI():number{
        //console.log('getIBI');
        return this.beforeIBI;
    }
    public getLength():number{
        //console.log('getLength');
        return this.list.getlength();
    }
    public setDataName(name:string){
        this.dataname= name+"_"+Date.now().toLocaleString();
        alert(this.dataname);
    }
    public writeFile(){
        firebase.push(
            this.dataname,
            {
                'nLF':this.model.nLF,
                'nHF':this.model.nHF,
                'HRV':this.model.HRV
            }
        );
    }
}

/*public Store(data:Uint8Array):boolean{
        if(this.list.getlength() == 256){
            this.hrv = new HRV(this.list);
            this.hrv.calHRV(this.list);
            this.list.clear();
        }
            let tmp = data[0] * 256 + data[1]
            if (!(this.beforeIBI == tmp)){
                this.beforeIBI = tmp;
            this.list.push(new heartmodel(data[0] * 256+ data[1]));
        }
    }*/