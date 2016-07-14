// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
function caculate() {
    let date1 = new Date();
    let one = date1.getTime();
      let num = 10000;
        let num2 = 1000;
        for (var index = 0; index < num; index++) {
            for (var j = 0; j < num2; j++) {
   
                let s = index.toString();
                s + ".119922";
                let sn = parseFloat(s);
                sn / sn + 1;
            }
        
        }
    let date2 = new Date();
    let two = date2.getTime();
    alert(two - one);
}