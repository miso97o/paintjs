const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

// css 사이즈 외에 실제 사이즈를 할당
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    if(filling === false){
        painting = true;
    }
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //path를 만들고 움직임
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        //마우스 누른 지점부터 path를 연결
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
} 

function changeRange(event){
    const size = event.target.value;
    console.log(size);
    ctx.lineWidth = size;
}

function changeMode(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,700,700);
    }
}

function handleCM(event){
    event.preventDefault()
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;  //href는 URL
    link.download = "PaintJS[EXPORT]";  //download는 이름
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color =>
     color.addEventListener("click", changeColor)
);

if(range){
    range.addEventListener("input",changeRange)
}

if(mode){
    mode.addEventListener("click", changeMode)
}

if(save){
    save.addEventListener("click",handleSaveClick)
}