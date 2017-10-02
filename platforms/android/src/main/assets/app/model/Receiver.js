"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heart_model_1 = require("./heart.model.");
var Queue_1 = require("./Queue");
var calHRV_1 = require("./calHRV");
var firebase = require("nativescript-plugin-firebase");
var Receiver = (function () {
    function Receiver() {
        this.list = new Queue_1.Queue;
        this.hrv = new calHRV_1.HRV;
        this.beforeIBI = 0;
        this.dataname = Date.now().toLocaleString();
    }
    Receiver.prototype.process = function () {
        //console.log('process');
        if (this.isNotFill()) {
            this.Store();
        }
        else {
            this.hrv.setQueue(this.list);
            this.model = this.hrv.calHRV();
            this.writeFile();
            this.outData();
            this.Store();
        }
    };
    Receiver.prototype.receive = function (data) {
        //console.log('receive');
        this.tmpdata = data[0] * 256 + data[1];
        if (this.tmpdata != this.beforeIBI) {
            this.process();
        }
    };
    Receiver.prototype.outData = function () {
        console.log('outData');
        for (var i = 0; i < 10; i++) {
            this.list.shift();
        }
    };
    Receiver.prototype.isNotFill = function () {
        //console.log('isNotFill');
        if (this.list.getlength() >= 256) {
            return false;
        }
        else {
            return true;
        }
    };
    Receiver.prototype.Store = function () {
        //console.log('Store');
        this.list.push(new heart_model_1.heartmodel(this.tmpdata));
        this.beforeIBI = this.tmpdata;
    };
    Receiver.prototype.getIBI = function () {
        //console.log('getIBI');
        return this.beforeIBI;
    };
    Receiver.prototype.getLength = function () {
        //console.log('getLength');
        return this.list.getlength();
    };
    Receiver.prototype.setDataName = function (name) {
        this.dataname = name + "_" + Date.now().toLocaleString();
        alert(this.dataname);
    };
    Receiver.prototype.writeFile = function () {
        firebase.push(this.dataname, {
            'nLF': this.model.nLF,
            'nHF': this.model.nHF,
            'HRV': this.model.HRV
        });
    };
    return Receiver;
}());
exports.Receiver = Receiver;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjZWl2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZWNlaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE0QztBQUM1QyxpQ0FBZ0M7QUFDaEMsbUNBQStCO0FBRy9CLHVEQUEyRDtBQUMzRDtJQUFBO1FBRVksU0FBSSxHQUFHLElBQUksYUFBSyxDQUFDO1FBRWpCLFFBQUcsR0FBRyxJQUFJLFlBQUcsQ0FBQztRQUNkLGNBQVMsR0FBVSxDQUFDLENBQUM7UUFHckIsYUFBUSxHQUFVLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQWdFMUQsQ0FBQztJQS9EVSwwQkFBTyxHQUFkO1FBQ0kseUJBQXlCO1FBQ3pCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUNNLDBCQUFPLEdBQWQsVUFBZSxJQUFlO1FBQzFCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNMLENBQUM7SUFFTywwQkFBTyxHQUFmO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFTyw0QkFBUyxHQUFqQjtRQUNJLDJCQUEyQjtRQUMzQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBQ08sd0JBQUssR0FBYjtRQUNJLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUM7SUFDTSx5QkFBTSxHQUFiO1FBQ0ksd0JBQXdCO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDTSw0QkFBUyxHQUFoQjtRQUNJLDJCQUEyQjtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ00sOEJBQVcsR0FBbEIsVUFBbUIsSUFBVztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFFLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNNLDRCQUFTLEdBQWhCO1FBQ0ksUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFJLENBQUMsUUFBUSxFQUNiO1lBQ0ksS0FBSyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNwQixLQUFLLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQ3BCLEtBQUssRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7U0FDdkIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDO0FBeEVZLDRCQUFRO0FBMEVyQjs7Ozs7Ozs7Ozs7T0FXTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhlYXJ0bW9kZWwgfSBmcm9tICcuL2hlYXJ0Lm1vZGVsLic7XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAnLi9RdWV1ZSc7XHJcbmltcG9ydCB7IEhSViB9IGZyb20gJy4vY2FsSFJWJztcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SFJWbW9kZWx9IGZyb20gJy4vSFJWbW9kZWwnO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSAgcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xyXG5leHBvcnQgY2xhc3MgUmVjZWl2ZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0ID0gbmV3IFF1ZXVlO1xyXG4gICAgcHJpdmF0ZSB0bXA6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBocnYgPSBuZXcgSFJWO1xyXG4gICAgcHJpdmF0ZSBiZWZvcmVJQkk6bnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdG1wZGF0YTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1vZGVsOkhSVm1vZGVsO1xyXG4gICAgcHJpdmF0ZSBkYXRhbmFtZTpzdHJpbmcgPSBEYXRlLm5vdygpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICBwdWJsaWMgcHJvY2VzcygpeyAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncHJvY2VzcycpO1xyXG4gICAgICAgIGlmKHRoaXMuaXNOb3RGaWxsKCkpe1xyXG4gICAgICAgICAgICB0aGlzLlN0b3JlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ocnYuc2V0UXVldWUodGhpcy5saXN0KTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbD10aGlzLmhydi5jYWxIUlYoKTtcclxuICAgICAgICAgICAgdGhpcy53cml0ZUZpbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5vdXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVjZWl2ZShkYXRhOlVpbnQ4QXJyYXkpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3JlY2VpdmUnKTtcclxuICAgICAgICB0aGlzLnRtcGRhdGEgPSBkYXRhWzBdICogMjU2KyBkYXRhWzFdO1xyXG4gICAgICAgIGlmICh0aGlzLnRtcGRhdGEgIT0gdGhpcy5iZWZvcmVJQkkpe1xyXG4gICAgICAgIHRoaXMucHJvY2VzcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG91dERhdGEoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnb3V0RGF0YScpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IDEwO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90RmlsbCgpOmJvb2xlYW57ICAgICAgLy93ZSBvbmx5IG5lZWQgMjU2IGRhdGEgdG8gY2FsY3VsYXRlLHNvIGxlbmd0aCA8IDI1NlxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2lzTm90RmlsbCcpO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdC5nZXRsZW5ndGgoKSA+PSAyNTYpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgU3RvcmUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdTdG9yZScpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKG5ldyBoZWFydG1vZGVsKHRoaXMudG1wZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuYmVmb3JlSUJJID0gdGhpcy50bXBkYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldElCSSgpOm51bWJlcntcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdnZXRJQkknKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWZvcmVJQkk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TGVuZ3RoKCk6bnVtYmVye1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2dldExlbmd0aCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuZ2V0bGVuZ3RoKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0RGF0YU5hbWUobmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZGF0YW5hbWU9IG5hbWUrXCJfXCIrRGF0ZS5ub3coKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIGFsZXJ0KHRoaXMuZGF0YW5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHdyaXRlRmlsZSgpe1xyXG4gICAgICAgIGZpcmViYXNlLnB1c2goXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YW5hbWUsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICduTEYnOnRoaXMubW9kZWwubkxGLFxyXG4gICAgICAgICAgICAgICAgJ25IRic6dGhpcy5tb2RlbC5uSEYsXHJcbiAgICAgICAgICAgICAgICAnSFJWJzp0aGlzLm1vZGVsLkhSVlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLypwdWJsaWMgU3RvcmUoZGF0YTpVaW50OEFycmF5KTpib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMubGlzdC5nZXRsZW5ndGgoKSA9PSAyNTYpe1xyXG4gICAgICAgICAgICB0aGlzLmhydiA9IG5ldyBIUlYodGhpcy5saXN0KTtcclxuICAgICAgICAgICAgdGhpcy5ocnYuY2FsSFJWKHRoaXMubGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRtcCA9IGRhdGFbMF0gKiAyNTYgKyBkYXRhWzFdXHJcbiAgICAgICAgICAgIGlmICghKHRoaXMuYmVmb3JlSUJJID09IHRtcCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVJQkkgPSB0bXA7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKG5ldyBoZWFydG1vZGVsKGRhdGFbMF0gKiAyNTYrIGRhdGFbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki8iXX0=