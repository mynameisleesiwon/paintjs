const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

// 같은 문자가 두번 이상 쓰일 때 변수로 지정
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
// canvas에 픽셀에 너비와 높이값을 줘야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 시작과 함께 선을 그리고 저장하면 배경이 투명하게되서
// 처음 시작할때 뒷 배경이 하얀색이도록 만들어줌
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// 우리가 그릴 선의 색깔
ctx.strokeStyle = INITIAL_COLOR;
// 그 선의 너비
ctx.lineWidth = 2.5;

ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

// 마우스를 움직이는 내내 발생
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("creating path in ", x, y);
    // path를 그리기 시작(눈에안보임)
    ctx.beginPath();
    // path를 마우스의 좌표 x,y로 옮김
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in ", x, y);
    // path 의 전 위치에서 지금까지 선을 만드는 것
    ctx.lineTo(x, y);
    // 선 그리기
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling == true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick() {
  // toDataURl 디폴트 : png
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  // 사진 제목
  link.download = "PaintJs[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  // 사람들이 오른쪽 마우스로 사진을 저장하지 못하게 하는 방법
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from 메소드 : object로부터 array를 만듬
// forEach 안에 color는 어떤 단어 써도 상관없음
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
