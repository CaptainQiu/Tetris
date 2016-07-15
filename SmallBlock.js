"use strict";
var SmallBlock = (function () {
    function SmallBlock(cv, x, y, len, line) {
        this.cv = cv.getContext("2d");
        this.x = x;
        this.y = y;
        this.length = len;
        this.lineWidth = line;
        this.cv.strokeStyle = "gray";
        this.cv.lineWidth = line;
    }
    SmallBlock.prototype.SetColor = function (color) {
        this.cv.fillStyle = color;
    };
    SmallBlock.prototype.Draw = function () {
        this.cv.fillRect(this.x, this.y, this.length, this.length);
        this.cv.strokeRect(this.x + this.lineWidth / 2, this.y + this.lineWidth / 2, this.length - this.lineWidth, this.length - this.lineWidth);
    };
    SmallBlock.prototype.Clear = function () {
        //this.Call(() => { this.ClearDoing(); });
        this.cv.clearRect(this.x, this.y, this.length, this.length);
    };
    SmallBlock.prototype.Call = function (callback) {
        callback();
    };
    SmallBlock.prototype.MoveDown = function () {
        this.Clear();
        this.y += this.length;
        this.Draw();
    };
    SmallBlock.prototype.MoveLeft = function () {
        this.Clear();
        this.x -= this.length;
        this.Draw();
    };
    SmallBlock.prototype.MoveRight = function () {
        this.Clear();
        this.x += this.length;
        this.Draw();
    };
    SmallBlock.Test = function (cv) {
        var sb = new SmallBlock(cv, 30, 30, 60, 6);
        sb.SetColor("red");
        sb.Draw();
        //sb.MoveDown();
        //  sb.MoveLeft();
        //  setInterval(sb.MoveDown.bind(sb),1000);
        //  setInterval(sb.MoveRight.bind(sb),1000);
    };
    return SmallBlock;
}());
exports.SmallBlock = SmallBlock;
