
import {ShapeType, Tetris} from"./Tetris";
import {SmallBlock} from "./SmallBlock";

const blocklength = 30; 
const canvasWidth = parseInt(document.getElementById("canvas").getAttribute("width"));
const canvasHeight =parseInt(  document.getElementById("canvas").getAttribute("height"));


export class DrawT
{
    //坐标点
    nowX: number=canvasWidth/2;
    nowY: number=canvasHeight/2;

    nowRightX: number;
    nowLeftX: number;

    sbArray: SmallBlock[];
    nowBlock: number[][];
    tetrist: Tetris;

    color: string;

    static cv = document.getElementById("canvas");

    constructor(tetris:Tetris)
    { 
        this.sbArray = new Array();
        this.tetrist = tetris;
    }

    IniNew()
    { 
        this.sbArray = new Array();
        
        for (let i = 0; i < 4; i++)
        { 
            for (let j = 0; j < 4; j++)
            { 
                if (this.tetrist.nowBlock[i][j] != 0)
                { 
                    let sb = new SmallBlock(DrawT.cv,  this.nowX+(j)* blocklength,this.nowY+( i ) * blocklength,blocklength,2);
                    this.SetColor();
                    this.sbArray.push(sb);
                }    
            }    
        }    
    }

    Draw() {
        this.SetColor();
        for (let i = 0; i < this.sbArray.length; i++) {
            this.sbArray[i].Draw();
        }
    }

    Clear()
    { 
        for (let i = 0; i < this.sbArray.length; i++)
        { 
            this.sbArray[i].Clear();
        }    
    }
    MoveDown()
    { 
        this.nowY += blocklength;
        this.Clear();
         for (let i = 0; i < this.sbArray.length; i++)
        { 
             this.sbArray[i].MoveDown();
        } 
         this.Draw();
    }

    Rotate()
    { 
        this.Clear();
        this.tetrist.Rotate();
        this.IniNew();
        this.Draw();
    }
    SetColor( )
    { 
          for (let i = 0; i < this.sbArray.length; i++)
        { 
              this.sbArray[i].SetColor(this.color);
        } 
    }

    static Test()
    { 
        Tetris.GetRotateBlock();
        
        let t = new DrawT(new Tetris(ShapeType.LinePiece));
        t.color = "red";
        t.IniNew();
        t.Draw();
        //setInterval(t.MoveDown.bind(t), 1000);
        setInterval(t.Rotate.bind(t),1000);

    }

}