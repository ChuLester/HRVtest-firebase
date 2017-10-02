import {Queue} from './Queue'
import {heartmodel} from './heart.model.'
import {HRVmodel} from './HRVmodel';
var FFT = require('fft.js');
var linspace = require('linspace');


export class HRV{
    
    private f = new FFT(256);
    private TP:number;
    private nHF:number;
    private nLF:number;
    private HF:number;
    private LF:number;
    private VLF:number;
    private list:Queue;
    hz:number = 0;
    public setQueue(queue:Queue){
        this.list = queue;
    }
    private step():Array<number>{               //build index for psd x-axis
        let out;
        out = linspace(0,1,256)
        let samplerate = 1000/this.list.mean();
        for (let i in out){
            out[i] =  samplerate / 2 * out[i];
        }   
        return out;
    }
    
    
    private calElement(list:Array<number>){   //calulate HRV element:VLF(0~0.04) LF(0.04~0.15) HF(0.15~0.4)
        this.VLF = 0;   this.LF = 0; this.HF = 0; this.TP = 0;
        let count = 0;
       for (let i in list){
           let hz =parseFloat(i);
           if (hz >0 && hz <= 0.04){
               this.VLF+=list[hz];
           }
           if (hz >0.04 && hz<=0.15){
               this.LF+=list[hz];
           }
           if (hz >0.15 && hz <=0.4){
               this.HF+=list[hz];
           }
           //console.log(String(count++) + ":" + String(hz) + ":" + String(list[hz]));
           this.TP += list[hz];
       }
    }

    private toFFT(list:Queue):any{      //use fft api to compute
        let out = this.f.createComplexArray();
        let data = this.f.toComplexArray(list.toNumberArray())
        
        this.f.realTransform(out,data);
        return out;
    }


    public calHRV():HRVmodel{
        let nfft = 256;
        
        
        let fft = this.toFFT(this.list);
        let xfft = new Array<number>(fft.length);
        
        let j = -1;
        let faxis = this.step();
        for(let i of faxis){
            xfft[i] = Math.abs(fft[j++]) ^ 2 / nfft;
            //console.log(String(j)+":"+String(i) +":"+ String(xfft[i]));
        }
        this.calElement(xfft);
        this.nHF = this.HF / (this.TP - this.VLF);
        this.nLF = this.LF / (this.TP - this.VLF);
        console.log(this.LF);
        console.log(this.HF);
        console.log(this.nLF);
        console.log(this.nHF);
        /*alert("nHF : " + String(this.nHF)+ "\n" +
              "nLF : " + String(this.nLF) + "\n" + 
              "HRV : " + String(this.nHF/this.nLF));*/
        return new HRVmodel(this.nHF,this.nLF,this.LF/this.HF);
    }
    

}