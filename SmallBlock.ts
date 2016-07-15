


export class SmallBlock {

    //小方块所在的格子坐标
    x: number;
    y: number;
    length: number;
    lineWidth: number;
    cv;
    constructor(cv, x: number, y: number, len: number,line:number) {
        this.cv = cv.getContext("2d");
        this.x = x;
        this.y = y;
        this.length = len;
        this.lineWidth = line;
        this.cv.strokeStyle = "gray";
        this.cv.lineWidth = line;
    }
    
    SetColor(color: string) {
        this.cv.fillStyle = color;
    }

    Draw() {
         this.cv.fillRect(this.x, this.y, this.length, this.length);
         this.cv.strokeRect(this.x + this.lineWidth / 2, this.y + this.lineWidth / 2, this.length - this.lineWidth,
             this.length-this.lineWidth);
       
    }

    Clear() { 
        //this.Call(() => { this.ClearDoing(); });
         this.cv.clearRect(this.x, this.y, this.length, this.length);
    }    
    
    Call(callback)
    { 
        callback();
    }

    MoveDown() {
        this.Clear();
        this.y += this.length;
        this.Draw();
    }
    MoveLeft() {
        this.Clear();
        this.x -=this.length;
        this.Draw();
    }
    MoveRight() {
        this.Clear();
        this.x += this.length;
        this.Draw();
    }

    static Test(cv) {
        let sb = new SmallBlock(cv, 30, 30, 60,6);
        sb.SetColor("red");
        sb.Draw();
        //sb.MoveDown();
      //  sb.MoveLeft();
      //  setInterval(sb.MoveDown.bind(sb),1000);
      //  setInterval(sb.MoveRight.bind(sb),1000);
        
    }
    
}