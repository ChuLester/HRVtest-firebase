import {DEVICE} from './device';
import {Injectable } from '@angular/core';
import {Receiver} from './model/Receiver';

var bluetooth = require('nativescript-bluetooth');

@Injectable()
export class bluetoothservice{
    private devicesarray:Array<DEVICE> = new Array;
    private device:DEVICE;
    

    connectToArduino(){
        bluetooth.hasCoarseLocationPermission().then(
            function(granted) {
            
            console.log("Has Location Permission? " + granted);
            if (!granted){
                bluetooth.requestCoarseLocationPermission().then(
                    function() {
                    console.log('request successful');
                    }
                );
            }
            }
        );
   
        
        this.scan().then(() =>{
            console.log("Try to Connect");
            this.device = this.devicesarray.filter(d =>d.name && d.name.indexOf('Heart01')> -1)[0]; //修改成藍芽名稱
            if(this.device){
                this.connect(this.device.UUID);
                alert('CONNECT SUCCESSFUL');
            } else {
                alert('fail');
            }
        },()=>{
            console.log("Scan Fail");
        });
    
    }
    scan():Promise<any>{
        
        console.log('Scanning....');
        this.devicesarray = new Array;

        return bluetooth.startScanning({
            serviceUUIDs:[],
            seconds:4,
            onDiscovered:(found) => {
                const device = new DEVICE(found.UUID,found.name,found.services);
                console.log(found.name);
                this.devicesarray.push(device);
            }
        });
    }

    connect(UUID: string): Promise<any> {
        return bluetooth.connect({
            UUID: UUID,
            onConnected: (peripheral) => {
                console.log("Periperhal connected with UUID: " + peripheral.UUID);
                peripheral.services.forEach(function (service) {
                    console.log("Service found: " + JSON.stringify(service));
                });
            },
            onDisconnected: (peripheral) => {
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID)
            }
        });
    }

    StartRead(receiver:Receiver):any {
        bluetooth.startNotifying({
            peripheralUUID:this.device.UUID,
            serviceUUID:'ffe0',
            characteristicUUID:'ffe1',
            onNotify: function (result) {
              // see the read example for how to decode ArrayBuffers
              //console.log("read: " + JSON.stringify(result));
              var data = new Uint8Array(result.value);

              receiver.receive(data);
              
              //read data is 8-bit,value < 256
              //0~1 Signal,2~3 ibi
            }  
          }).then(function() {
            console.log("subscribed for notifications");
          });
    }
    StopRead() {
        bluetooth.stopNotifying({
            peripheralUUID:this.device.UUID,
            serviceUUID:'ffe0',
            characteristicUUID:'ffe1'
          }).then(function() {
            console.log("unsubscribed for notifications");
          }, function (err) {
            console.log("unsubscribe error: " + err);
          });
    }
}