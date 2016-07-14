


export class SmallBlock { 

    //小方块所在的格子坐标
    x: number;
    y: number;
    length: number;
    cv;
    constructor(cv, x: number, y: number, len: number) {
        this.cv = cv.getContext("2d");
        this.x = x;
        this.y = y;
        this.length = len;
    }

    Draw()
    { 
        this.cv.fillRect(this.x, this.y, this.length);
    }
    
    Clear()
    { 
        this.cv.clearRect(this.x, this.y, this.length);
    }

    MoveDown()
    { 
        this.Clear();
        this.y +=1;
        this.Draw();
    }
    MoveLeft()
    { 
        this.Clear();
        this.x - 1;
        this.Draw();
    }
    MoveRight()
    { 
        this.Clear();
        this.x + 1;
        this.Draw();
    }
    
}