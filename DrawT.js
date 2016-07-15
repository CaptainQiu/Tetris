"use strict";
var Tetris_1 = require("./Tetris");
var SmallBlock_1 = require("./SmallBlock");
var blocklength = 30;
var canvasWidth = parseInt(document.getElementById("canvas").getAttribute("width"));
var canvasHeight = parseInt(document.getElementById("canvas").getAttribute("height"));
var DrawT = (function () {
    function DrawT(tetris) {
        //坐标点
        this.nowX = canvasWidth / 2;
        this.nowY = canvasHeight / 2;
        this.sbArray = new Array();
        this.tetrist = tetris;
    }
    DrawT.prototype.IniNew = function () {
        this.sbArray = new Array();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.tetrist.nowBlock[i][j] != 0) {
                    var sb = new SmallBlock_1.SmallBlock(DrawT.cv, this.nowX + (j) * blocklength, this.nowY + (i) * blocklength, blocklength, 2);
                    this.SetColor();
                    this.sbArray.push(sb);
                }
            }
        }
    };
    DrawT.prototype.Draw = function () {
        this.SetColor();
        for (var i = 0; i < this.sbArray.length; i++) {
            this.sbArray[i].Draw();
        }
    };
    DrawT.prototype.Clear = function () {
        for (var i = 0; i < this.sbArray.length; i++) {
            this.sbArray[i].Clear();
        }
    };
    DrawT.prototype.MoveDown = function () {
        this.nowY += blocklength;
        this.Clear();
        for (var i = 0; i < this.sbArray.length; i++) {
            this.sbArray[i].MoveDown();
        }
        this.Draw();
    };
    DrawT.prototype.Rotate = function () {
        this.Clear();
        this.tetrist.Rotate();
        this.IniNew();
        this.Draw();
    };
    DrawT.prototype.SetColor = function () {
        for (var i = 0; i < this.sbArray.length; i++) {
            this.sbArray[i].SetColor(this.color);
        }
    };
    DrawT.Test = function () {
        Tetris_1.Tetris.GetRotateBlock();
        var t = new DrawT(new Tetris_1.Tetris(Tetris_1.ShapeType.LinePiece));
        t.color = "red";
        t.IniNew();
        t.Draw();
        //setInterval(t.MoveDown.bind(t), 1000);
        setInterval(t.Rotate.bind(t), 1000);
    };
    DrawT.cv = document.getElementById("canvas");
    return DrawT;
}());
exports.DrawT = DrawT;
