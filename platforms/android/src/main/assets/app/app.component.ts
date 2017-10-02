import {Component } from "@angular/core";
import {bluetoothservice} from './bluetoothservice';
import {Receiver} from './model/Receiver';
import firebase = require("nativescript-plugin-firebase");
import { TextField } from "ui/text-field";
import { TextView } from "ui/text-view";
import { isAndroid } from "platform";
var linspace = require('linspace');

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
})

export class AppComponent {
    public bpm = 'bpm';
    public singal = 'singal';
    public ibi = 'ibi';
    public Connect = 'Connect';
    public read = 'close';
    public complete = 'complete';
    private receiver = new Receiver(); 
    public editState = true;
    public tvtext = "";
    public firstTx: string = "";
        constructor(private Service: bluetoothservice) { 
            firebase.init({
                // Optionally pass in properties for database, authentication and cloud messaging,
                // see their respective docs.
              }).then(
                (instance) => {
                  console.log("firebase.init done");
                },
                (error) => {
                  console.log("firebase.init error: " + error);
                }
              );
            /*firebase.login({
                type:firebase.LoginType.ANONYMOUS
            }).then((user)=>{
                alert(user.uid);
            });*/
            firebase.login({
                type: firebase.LoginType.FACEBOOK,
                // Optional
                facebookOptions: {
                  // defaults to ['public_profile', 'email']
                  scope: ['public_profile', 'email']
                }
              }).then(
                  function (result) {
                    JSON.stringify(result);
                    console.log('sucessful');
                  },
                  function (errorMessage) {
                    console.log(errorMessage);
                  }
              );
        }
    ConnectFunction(){
        //alert('bluetooth device not ready');
        this.Service.connectToArduino();
    }
    public isEnable:boolean = false;

    ControlRead(){
        if (this.isEnable){
            this.Service.StopRead();
            this.read = 'CLOSE';
        } else {
            this.Service.StartRead(this.receiver);
            this.isEnable = true;
            this.read = 'OPEN';
            
            var timer = setInterval(()=>{
                this.ibi = String(this.receiver.getIBI());
                this.complete = String(this.receiver.getLength());
            },100);
        }
    }
    
    test(){
        /*for(let i of this.newstep()){
            console.log(String(i));
        }*/
        alert("Text: " + this.firstTx);
    }
    addData(){
        this.receiver.setDataName(this.firstTx);
        //alert(this.firstTx);
    }
    test2(){
    }

    newstep():Array<number>{
        let step;
        step = linspace(0,1,256)
        let samplerate:number = 1/ 800 * 1000;
        for (let i in step){
            step[i] =  samplerate / 2 * step[i];
        } 
        return step;
    }



    public onTextChange(args) {
        let textField = <TextField>args.object;

        console.log("onTextChange");
        this.firstTx = textField.text;
    }
    showText() {
        alert("Text: " + this.tvtext);
    }

    submit(args) {
        let textview: TextView = <TextView>args.object;
        if (isAndroid) {
            textview.android.clearFocus();
        }
    }
    
 }
