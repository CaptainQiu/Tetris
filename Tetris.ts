
import hashmap = require('./tools/hashmap');
/**
 * Tetris
 */
export class Tetris {
    
    shape: ShapeType;
    direction: number=0;
    static hp = new hashmap.HashMap();
    nowBlock: number[][];
    
    
    constructor( st:ShapeType) {
        this.nowBlock = Tetris.GetIniBlock(st);
        this.shape = st;
    }

    Rotate() {
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
    }


/**
 * 得到初始方块 */
    static GetIniBlock(myshape: ShapeType): number[][]
    {
         
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
        
    }


/**
 * 顺时针旋转九十度 */
  
  static Rotate90(block: number[][]): number[][]
  { 
      let resB: number[][] = new Array();
      
      for (let i = 0; i < 4; i++)
      { 
          resB.push([0, 0, 0, 0]);
      }    
      
      for (let i = 0; i < block.length; i++)
      { 
          for (let j = 0; j < block[i].length;j++)
          { 
              resB[i][j] = block[3-j][i];
          }    
      }    
      return resB;
    }  



  static MoveBlock(block: number[][], moveLeft: number): number[][] {
      let resB: number[][]=new Array();
      for (let i = 0; i < 4; i++) {
          resB.push([0, 0, 0, 0]);
      }

      if (moveLeft == 90) {
          for (let i = 0; i < 4; i++) {
              for (let j = 2; j < 4; j++) {
                  resB[i][j - 2] = block[i][j];
              }
          }
      }
      else if (moveLeft = 180) {
          let tempB: number[][] = new Array();
          for (let i = 0; i < 4; i++) {
              tempB.push([0, 0, 0, 0]);
          }
          for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 3; j++) {
                  tempB[i][j] = block[i][j + 1];
              }
          }
          for (let i = 2; i < 4; i++) {
              for (let j = 0; j < 4; j++) {
                  resB[i - 2][j] = tempB[i][j];
              }
          }


      }
      else if (moveLeft = 270) {

          for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 4; j++) {
                  resB[i][j] = block[i+1][j];
              }
          }
      }
      return resB;
  }
       

  /**
   * 得到需要的旋转后的方块 */
  static GetRotateBlock():void
  { 
      /*
      let lb = this.GetIniBlock(ShapeType.LBlock);
      this.dic[ShapeType.LBlock]["90"] = this.Rotate90(lb);
      this.dic[ShapeType.LBlock]["180"] = this.Rotate90(this.Rotate90(lb));
      this.dic[ShapeType.LBlock]["270"] = this.Rotate90(this.Rotate90(this.Rotate90(lb)));
      */
    
      for (let i = 0; i < 7; i++) {

          let block = this.GetIniBlock(i);
          let b90 = this.Rotate90(block);
          let b180 = this.Rotate90(b90);
          let b270 = this.Rotate90(b180);

          if (i as ShapeType == ShapeType.LinePiece) {

              let hp = new hashmap.HashMap();
              this.hp.set(i as ShapeType, hp);
              hp.set("90", this.MoveBlock(b90, 90));

              hp.set("180", block);

              hp.set("270", [[0, 1, 0, 0],
                  [0, 1, 0, 0],
                  [0, 1, 0, 0],
                  [0, 1, 0, 0]]);
              continue;
          }  

          let hp = new hashmap.HashMap();          
          this.hp.set(i as ShapeType,hp);          
          hp.set("90", this.MoveBlock(b90, 90));

         
          hp.set("180", this.MoveBlock(b180, 180));
       
          hp.set("270", this.MoveBlock(b270, 270));
          

       /*
          this.dic.push([[i as ShapeType], ["90"], this.MoveBlock(b90, true)]);
          this.dic.push([[i as ShapeType],["180"],this.MoveBlock( b180,false)]);
          this.dic.push([[i as ShapeType],["270"] , this.Rotate90(b270)]);
          */
      }
  }
    
  static PrintfTest()
  { 
      this.GetRotateBlock();
      let block = this.hp.get(ShapeType.LBlock).get("180")
    //  alert(block);
      console.log(block);
      console.log(this.hp.get(ShapeType.LBlock));
  }
    
}






/**
 *LBlock:L型方块
  RLBlock:反L型方块
  Square：正方形方块
  TBlcok:T型方块
  Squiggly:Z型方块
  RSquiggly:反Z型方块
  LinePiece:一根直的方块
 */
export enum ShapeType { LBlock = 0, Square, RLBlock, TBlcok, Squiggly, RSquiggly, LinePiece }


/**
 *顺时针旋转角度，90度
 */
enum Direction { None = 0, Up, Right, Down }


