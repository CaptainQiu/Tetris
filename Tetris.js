"use strict";
var hashmap = require('./tools/hashmap');
/**
 * Tetris
 */
var Tetris = (function () {
    function Tetris(st) {
        this.direction = 0;
        this.nowBlock = Tetris.GetIniBlock(st);
        this.shape = st;
    }
    Tetris.prototype.Rotate = function () {
        this.direction += 90;
        if (this.direction == 360) {
            this.direction = 0;
        }
        if (this.direction == 0) {
            this.nowBlock = Tetris.GetIniBlock(this.shape);
        }
        else {
            console.log(this.direction);
            this.nowBlock = Tetris.hp.get(this.shape).get(this.direction.toString());
            console.log(this.nowBlock);
        }
    };
    /**
     * 得到初始方块 */
    Tetris.GetIniBlock = function (myshape) {
        switch (myshape) {
            case ShapeType.LBlock:
                return [[1, 1, 1, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            case ShapeType.RLBlock:
                return [[1, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            case ShapeType.LinePiece:
                return [[1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            case ShapeType.TBlcok:
                return [[1, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            case ShapeType.Squiggly:
                return [[1, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            case ShapeType.RSquiggly:
                return [[0, 1, 1, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            case ShapeType.Square:
                return [[1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
            default:
                break;
        }
    };
    /**
     * 顺时针旋转九十度 */
    Tetris.Rotate90 = function (block) {
        var resB = new Array();
        for (var i = 0; i < 4; i++) {
            resB.push([0, 0, 0, 0]);
        }
        for (var i = 0; i < block.length; i++) {
            for (var j = 0; j < block[i].length; j++) {
                resB[i][j] = block[3 - j][i];
            }
        }
        return resB;
    };
    Tetris.MoveBlock = function (block, moveLeft) {
        var resB = new Array();
        for (var i = 0; i < 4; i++) {
            resB.push([0, 0, 0, 0]);
        }
        if (moveLeft == 90) {
            for (var i = 0; i < 4; i++) {
                for (var j = 2; j < 4; j++) {
                    resB[i][j - 2] = block[i][j];
                }
            }
        }
        else if (moveLeft = 180) {
            var tempB = new Array();
            for (var i = 0; i < 4; i++) {
                tempB.push([0, 0, 0, 0]);
            }
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 3; j++) {
                    tempB[i][j] = block[i][j + 1];
                }
            }
            for (var i = 2; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    resB[i - 2][j] = tempB[i][j];
                }
            }
        }
        else if (moveLeft = 270) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    resB[i][j] = block[i + 1][j];
                }
            }
        }
        return resB;
    };
    /**
     * 得到需要的旋转后的方块 */
    Tetris.GetRotateBlock = function () {
        /*
        let lb = this.GetIniBlock(ShapeType.LBlock);
        this.dic[ShapeType.LBlock]["90"] = this.Rotate90(lb);
        this.dic[ShapeType.LBlock]["180"] = this.Rotate90(this.Rotate90(lb));
        this.dic[ShapeType.LBlock]["270"] = this.Rotate90(this.Rotate90(this.Rotate90(lb)));
        */
        for (var i = 0; i < 7; i++) {
            var block = this.GetIniBlock(i);
            var b90 = this.Rotate90(block);
            var b180 = this.Rotate90(b90);
            var b270 = this.Rotate90(b180);
            if (i == ShapeType.LinePiece) {
                var hp_1 = new hashmap.HashMap();
                this.hp.set(i, hp_1);
                hp_1.set("90", this.MoveBlock(b90, 90));
                hp_1.set("180", block);
                hp_1.set("270", [[0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]]);
                continue;
            }
            var hp = new hashmap.HashMap();
            this.hp.set(i, hp);
            hp.set("90", this.MoveBlock(b90, 90));
            hp.set("180", this.MoveBlock(b180, 180));
            hp.set("270", this.MoveBlock(b270, 270));
        }
    };
    Tetris.PrintfTest = function () {
        this.GetRotateBlock();
        var block = this.hp.get(ShapeType.LBlock).get("180");
        //  alert(block);
        console.log(block);
        console.log(this.hp.get(ShapeType.LBlock));
    };
    Tetris.hp = new hashmap.HashMap();
    return Tetris;
}());
exports.Tetris = Tetris;
/**
 *LBlock:L型方块
  RLBlock:反L型方块
  Square：正方形方块
  TBlcok:T型方块
  Squiggly:Z型方块
  RSquiggly:反Z型方块
  LinePiece:一根直的方块
 */
(function (ShapeType) {
    ShapeType[ShapeType["LBlock"] = 0] = "LBlock";
    ShapeType[ShapeType["Square"] = 1] = "Square";
    ShapeType[ShapeType["RLBlock"] = 2] = "RLBlock";
    ShapeType[ShapeType["TBlcok"] = 3] = "TBlcok";
    ShapeType[ShapeType["Squiggly"] = 4] = "Squiggly";
    ShapeType[ShapeType["RSquiggly"] = 5] = "RSquiggly";
    ShapeType[ShapeType["LinePiece"] = 6] = "LinePiece";
})(exports.ShapeType || (exports.ShapeType = {}));
var ShapeType = exports.ShapeType;
/**
 *顺时针旋转角度，90度
 */
var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Down"] = 3] = "Down";
})(Direction || (Direction = {}));
