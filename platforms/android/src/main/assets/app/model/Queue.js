"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = (function () {
    function Queue() {
        this.queue = new Array();
    }
    Queue.prototype.getlength = function () {
        return this.queue.length;
    };
    Queue.prototype.mean = function () {
        var sum = 0;
        for (var _i = 0, _a = this.queue; _i < _a.length; _i++) {
            var i = _a[_i];
            sum = sum + i.getIBI();
        }
        return Math.round(sum / this.getlength());
    };
    Queue.prototype.push = function (model) {
        this.queue.push(model);
        //console.log('Queue push');
    };
    Queue.prototype.shift = function () {
        this.queue.shift();
    };
    Queue.prototype.toNumberArray = function () {
        var result = new Array();
        for (var i in this.queue) {
            result[i] = this.queue[i].getIBI();
        }
        return result;
    };
    Queue.prototype.clear = function () {
        this.queue = [];
        console.log('Queue clear');
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJRdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBS0k7UUFGUSxVQUFLLEdBQUUsSUFBSSxLQUFLLEVBQWMsQ0FBQztJQUV6QixDQUFDO0lBRVIseUJBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVNLG9CQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBVSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVO1lBQW5CLElBQUksQ0FBQyxTQUFBO1lBQ04sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLG9CQUFJLEdBQVgsVUFBWSxLQUFnQjtRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2Qiw0QkFBNEI7SUFDaEMsQ0FBQztJQUNNLHFCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDTSw2QkFBYSxHQUFwQjtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNNLHFCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aGVhcnRtb2RlbH0gZnJvbSBcIi4vaGVhcnQubW9kZWwuXCJcclxuaW1wb3J0IHtIUlZ9IGZyb20gXCIuL2NhbEhSVlwiO1xyXG5leHBvcnQgY2xhc3MgUXVldWV7XHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIHF1ZXVlID1uZXcgQXJyYXk8aGVhcnRtb2RlbD4oKTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcblxyXG4gICAgcHVibGljIGdldGxlbmd0aCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1lYW4oKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHN1bSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiB0aGlzLnF1ZXVlKXtcclxuICAgICAgICAgICAgc3VtID0gc3VtICsgaS5nZXRJQkkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoc3VtIC8gdGhpcy5nZXRsZW5ndGgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1c2gobW9kZWw6aGVhcnRtb2RlbCl7XHJcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKG1vZGVsKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdRdWV1ZSBwdXNoJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hpZnQoKXtcclxuICAgICAgICB0aGlzLnF1ZXVlLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdG9OdW1iZXJBcnJheSgpOkFycmF5PG51bWJlcj57XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLnF1ZXVlKXtcclxuICAgICAgICAgICAgcmVzdWx0W2ldID0gdGhpcy5xdWV1ZVtpXS5nZXRJQkkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhcigpe1xyXG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZygnUXVldWUgY2xlYXInKTtcclxuICAgIH1cclxufSJdfQ==