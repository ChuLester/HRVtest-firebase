"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var device_1 = require("./device");
var core_1 = require("@angular/core");
var bluetooth = require('nativescript-bluetooth');
var bluetoothservice = (function () {
    function bluetoothservice() {
        this.devicesarray = new Array;
    }
    bluetoothservice.prototype.connectToArduino = function () {
        var _this = this;
        bluetooth.hasCoarseLocationPermission().then(function (granted) {
            console.log("Has Location Permission? " + granted);
            if (!granted) {
                bluetooth.requestCoarseLocationPermission().then(function () {
                    console.log('request successful');
                });
            }
        });
        this.scan().then(function () {
            console.log("Try to Connect");
            _this.device = _this.devicesarray.filter(function (d) { return d.name && d.name.indexOf('Heart01') > -1; })[0]; //修改成藍芽名稱
            if (_this.device) {
                _this.connect(_this.device.UUID);
                alert('CONNECT SUCCESSFUL');
            }
            else {
                alert('fail');
            }
        }, function () {
            console.log("Scan Fail");
        });
    };
    bluetoothservice.prototype.scan = function () {
        var _this = this;
        console.log('Scanning....');
        this.devicesarray = new Array;
        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            onDiscovered: function (found) {
                var device = new device_1.DEVICE(found.UUID, found.name, found.services);
                console.log(found.name);
                _this.devicesarray.push(device);
            }
        });
    };
    bluetoothservice.prototype.connect = function (UUID) {
        return bluetooth.connect({
            UUID: UUID,
            onConnected: function (peripheral) {
                console.log("Periperhal connected with UUID: " + peripheral.UUID);
                peripheral.services.forEach(function (service) {
                    console.log("Service found: " + JSON.stringify(service));
                });
            },
            onDisconnected: function (peripheral) {
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
            }
        });
    };
    bluetoothservice.prototype.StartRead = function (receiver) {
        bluetooth.startNotifying({
            peripheralUUID: this.device.UUID,
            serviceUUID: 'ffe0',
            characteristicUUID: 'ffe1',
            onNotify: function (result) {
                // see the read example for how to decode ArrayBuffers
                //console.log("read: " + JSON.stringify(result));
                var data = new Uint8Array(result.value);
                receiver.receive(data);
                //read data is 8-bit,value < 256
                //0~1 Signal,2~3 ibi
            }
        }).then(function () {
            console.log("subscribed for notifications");
        });
    };
    bluetoothservice.prototype.StopRead = function () {
        bluetooth.stopNotifying({
            peripheralUUID: this.device.UUID,
            serviceUUID: 'ffe0',
            characteristicUUID: 'ffe1'
        }).then(function () {
            console.log("unsubscribed for notifications");
        }, function (err) {
            console.log("unsubscribe error: " + err);
        });
    };
    return bluetoothservice;
}());
bluetoothservice = __decorate([
    core_1.Injectable()
], bluetoothservice);
exports.bluetoothservice = bluetoothservice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3Roc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsdWV0b290aHNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFDaEMsc0NBQTBDO0FBRzFDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBR2xELElBQWEsZ0JBQWdCO0lBRDdCO1FBRVksaUJBQVksR0FBaUIsSUFBSSxLQUFLLENBQUM7SUErRm5ELENBQUM7SUEzRkcsMkNBQWdCLEdBQWhCO1FBQUEsaUJBNkJDO1FBNUJHLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLElBQUksQ0FDeEMsVUFBUyxPQUFPO1lBRWhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO2dCQUNWLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLElBQUksQ0FDNUM7b0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQ0osQ0FBQztZQUNOLENBQUM7UUFDRCxDQUFDLENBQ0osQ0FBQztRQUdGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBRyxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDakcsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FB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QUNoRCxDQUFDLEVBQUUsVUFBVSxHQUFHO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFoR0QsSUFnR0M7QUFoR1ksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7R0FDQSxnQkFBZ0IsQ0FnRzVCO0FBaEdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7REVWSUNFfSBmcm9tICcuL2RldmljZSc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1JlY2VpdmVyfSBmcm9tICcuL21vZGVsL1JlY2VpdmVyJztcclxuXHJcbnZhciBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBibHVldG9vdGhzZXJ2aWNle1xyXG4gICAgcHJpdmF0ZSBkZXZpY2VzYXJyYXk6QXJyYXk8REVWSUNFPiA9IG5ldyBBcnJheTtcclxuICAgIHByaXZhdGUgZGV2aWNlOkRFVklDRTtcclxuICAgIFxyXG5cclxuICAgIGNvbm5lY3RUb0FyZHVpbm8oKXtcclxuICAgICAgICBibHVldG9vdGguaGFzQ29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKCkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24oZ3JhbnRlZCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIYXMgTG9jYXRpb24gUGVybWlzc2lvbj8gXCIgKyBncmFudGVkKTtcclxuICAgICAgICAgICAgaWYgKCFncmFudGVkKXtcclxuICAgICAgICAgICAgICAgIGJsdWV0b290aC5yZXF1ZXN0Q29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKCkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2FuKCkudGhlbigoKSA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUcnkgdG8gQ29ubmVjdFwiKTtcclxuICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSB0aGlzLmRldmljZXNhcnJheS5maWx0ZXIoZCA9PmQubmFtZSAmJiBkLm5hbWUuaW5kZXhPZignSGVhcnQwMScpPiAtMSlbMF07IC8v5L+u5pS55oiQ6JeN6Iq95ZCN56ixXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGV2aWNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdCh0aGlzLmRldmljZS5VVUlEKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdDT05ORUNUIFNVQ0NFU1NGVUwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdmYWlsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NhbiBGYWlsXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICB9XHJcbiAgICBzY2FuKCk6UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTY2FubmluZy4uLi4nKTtcclxuICAgICAgICB0aGlzLmRldmljZXNhcnJheSA9IG5ldyBBcnJheTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJsdWV0b290aC5zdGFydFNjYW5uaW5nKHtcclxuICAgICAgICAgICAgc2VydmljZVVVSURzOltdLFxyXG4gICAgICAgICAgICBzZWNvbmRzOjQsXHJcbiAgICAgICAgICAgIG9uRGlzY292ZXJlZDooZm91bmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZSA9IG5ldyBERVZJQ0UoZm91bmQuVVVJRCxmb3VuZC5uYW1lLGZvdW5kLnNlcnZpY2VzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvdW5kLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2VzYXJyYXkucHVzaChkZXZpY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdChVVUlEOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBibHVldG9vdGguY29ubmVjdCh7XHJcbiAgICAgICAgICAgIFVVSUQ6IFVVSUQsXHJcbiAgICAgICAgICAgIG9uQ29ubmVjdGVkOiAocGVyaXBoZXJhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJpcGVyaGFsIGNvbm5lY3RlZCB3aXRoIFVVSUQ6IFwiICsgcGVyaXBoZXJhbC5VVUlEKTtcclxuICAgICAgICAgICAgICAgIHBlcmlwaGVyYWwuc2VydmljZXMuZm9yRWFjaChmdW5jdGlvbiAoc2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmljZSBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IChwZXJpcGhlcmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmlwZXJoYWwgZGlzY29ubmVjdGVkIHdpdGggVVVJRDogXCIgKyBwZXJpcGhlcmFsLlVVSUQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBTdGFydFJlYWQocmVjZWl2ZXI6UmVjZWl2ZXIpOmFueSB7XHJcbiAgICAgICAgYmx1ZXRvb3RoLnN0YXJ0Tm90aWZ5aW5nKHtcclxuICAgICAgICAgICAgcGVyaXBoZXJhbFVVSUQ6dGhpcy5kZXZpY2UuVVVJRCxcclxuICAgICAgICAgICAgc2VydmljZVVVSUQ6J2ZmZTAnLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJpc3RpY1VVSUQ6J2ZmZTEnLFxyXG4gICAgICAgICAgICBvbk5vdGlmeTogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgIC8vIHNlZSB0aGUgcmVhZCBleGFtcGxlIGZvciBob3cgdG8gZGVjb2RlIEFycmF5QnVmZmVyc1xyXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZWFkOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQ4QXJyYXkocmVzdWx0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgcmVjZWl2ZXIucmVjZWl2ZShkYXRhKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvL3JlYWQgZGF0YSBpcyA4LWJpdCx2YWx1ZSA8IDI1NlxyXG4gICAgICAgICAgICAgIC8vMH4xIFNpZ25hbCwyfjMgaWJpXHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWJzY3JpYmVkIGZvciBub3RpZmljYXRpb25zXCIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBTdG9wUmVhZCgpIHtcclxuICAgICAgICBibHVldG9vdGguc3RvcE5vdGlmeWluZyh7XHJcbiAgICAgICAgICAgIHBlcmlwaGVyYWxVVUlEOnRoaXMuZGV2aWNlLlVVSUQsXHJcbiAgICAgICAgICAgIHNlcnZpY2VVVUlEOidmZmUwJyxcclxuICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWNVVUlEOidmZmUxJ1xyXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bnN1YnNjcmliZWQgZm9yIG5vdGlmaWNhdGlvbnNcIik7XHJcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5zdWJzY3JpYmUgZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19