import electron = require('electron');

/**
 * Tetris
 */
class Tetris {
    
    shape: ShapeType;
    direction: Direction;
    static dic: Array<number[][]>[];

    

    constructor( st:ShapeType,firstDirection:Direction) {
        
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
                         [0, 0, 0, 1],
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
      let resB: number[][];
      for (let i = 0; i < 4; i++)
      { 
          resB.push([0, 0, 0, 0]);
      }    
      
      for (let i = 0; i < block.length; i++)
      { 
          for (let j = 0; j < block[i].length;j++)
          { 
              resB[i][j] = block[j][i];
          }    
      }    
      return resB;
  }  
  /**
   * 得到需要的旋转后的方块 */
  static GetRotateBlock()
  { 
      let lb
      this.dic[ShapeType.LBlock]["90"]=
      
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
enum ShapeType { LBlock = 0, Square, RLBlock, TBlcok, Squiggly, RSquiggly, LinePiece }


/**
 *顺时针旋转角度，90度
 */
enum Direction { None = 0, Up, Right, Down }


