// Get references for canvas, context, and clear button
const canvas = document.getElementById("infinitePlane");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBoxes");

// Resize canvas based on window size minus the column width
function resizeCanvas() {
  canvas.width = window.innerWidth - document.querySelector(".columns").offsetWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => {
  resizeCanvas();
  requestDraw();
});

// Global variables for panning the infinite plane
let offsetX = 0, offsetY = 0;
let isDraggingPlane = false, dragStartX, dragStartY;

// Array for boxes on the canvas
const boxes = [];
let isDraggingBox = false, draggedBox = null;

// Draw the grid
function drawGrid() {
  const gridSize = 50;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  
  for (let x = -offsetX % gridSize; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  for (let y = -offsetY % gridSize; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// Draw all boxes on the canvas
function drawBoxes() {
  boxes.forEach(box => {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x + offsetX, box.y + offsetY, box.width, box.height);
    ctx.strokeStyle = "#222";
    ctx.strokeRect(box.x + offsetX, box.y + offsetY, box.width, box.height);
    
    if (box.label) {
      ctx.fillStyle = "#000";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        box.label,
        box.x + offsetX + box.width / 2,
        box.y + offsetY + box.height / 2
      );
    }
  });
}

// Smooth drawing using requestAnimationFrame
let drawScheduled = false;
function requestDraw() {
  if (!drawScheduled) {
    drawScheduled = true;
    requestAnimationFrame(() => {
      drawScheduled = false;
      drawGrid();
      drawBoxes();
    });
  }
}

// --- Drag & Drop from the Left Column ---

// Setup dragstart events on the left column boxes
document.querySelectorAll(".columns .box").forEach(box => {
  box.addEventListener("dragstart", (e) => {
    const rect = box.getBoundingClientRect();
    e.dataTransfer.setData("text/plain", JSON.stringify({
      width: rect.width,
      height: rect.height,
      label: box.textContent
    }));
  });
});

// Allow canvas to accept drops
canvas.addEventListener("dragover", (e) => {
  e.preventDefault();
});
canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  const newBox = {
    x: e.clientX - document.querySelector(".columns").offsetWidth - offsetX - data.width / 2,
    y: e.clientY - offsetY - data.height / 2,
    width: data.width,
    height: data.height,
    color: "#ff6f61",
    label: data.label
  };
  boxes.push(newBox);
  requestDraw();
});

// --- Dragging & Panning on the Canvas ---

// Get box under the cursor (accounting for the column)
function getBoxUnderCursor(e) {
  const colWidth = document.querySelector(".columns").offsetWidth;
  const x = e.clientX - colWidth - offsetX;
  const y = e.clientY - offsetY;
  return boxes.find(box =>
    x >= box.x &&
    x <= box.x + box.width &&
    y >= box.y &&
    y <= box.y + box.height
  );
}

// mousedown: decide to drag a box or pan the canvas
canvas.addEventListener("mousedown", (e) => {
  const box = getBoxUnderCursor(e);
  if (box) {
    isDraggingBox = true;
    draggedBox = box;
    dragStartX = e.clientX - document.querySelector(".columns").offsetWidth - box.x - offsetX;
    dragStartY = e.clientY - box.y - offsetY;
    canvas.style.cursor = "grabbing";
  } else {
    isDraggingPlane = true;
    dragStartX = e.clientX - offsetX;
    dragStartY = e.clientY - offsetY;
  }
});

// Mousemove: update positions for panning or dragging a box
canvas.addEventListener("mousemove", (e) => {
  if (isDraggingPlane) {
    offsetX = e.clientX - dragStartX;
    offsetY = e.clientY - dragStartY;
    requestDraw();
  } else if (isDraggingBox && draggedBox) {
    draggedBox.x = e.clientX - document.querySelector(".columns").offsetWidth - dragStartX - offsetX;
    draggedBox.y = e.clientY - dragStartY - offsetY;
    requestDraw();
    checkBoxOverlaps();
  }
});

// Mouseup & mouseleave: stop dragging
canvas.addEventListener("mouseup", () => {
  isDraggingPlane = false;
  isDraggingBox = false;
  draggedBox = null;
  canvas.style.cursor = "default";
});
canvas.addEventListener("mouseleave", () => {
  isDraggingPlane = false;
  isDraggingBox = false;
  draggedBox = null;
  canvas.style.cursor = "default";
});

// --- Collision Detection and Merging ---
// When two boxes overlap more than 50% of either's area, remove them and merge into a new box.
function checkBoxOverlaps() {
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i];
      const b = boxes[j];
      const x_overlap = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
      const y_overlap = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
      const overlapArea = x_overlap * y_overlap;
      const aArea = a.width * a.height;
      const bArea = b.width * b.height;
      const overlapRatioA = overlapArea / aArea;
      const overlapRatioB = overlapArea / bArea;
      
      if (overlapRatioA > 0.5 || overlapRatioB > 0.5) {
        // Compute new merged box parameters
        const newX = (a.x + b.x) / 2;
        const newY = (a.y + b.y) / 2;
        const newWidth = (a.width + b.width) / 2;
        const newHeight = (a.height + b.height) / 2;
        const newBox = {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          color: "#800080",  // Merged box color
          label: "Merged"
        };

        // Remove boxes a and b and add new merged box
        boxes.splice(j, 1);
        boxes.splice(i, 1);
        boxes.push(newBox);
        requestDraw();
        console.log("Merged two boxes into a new one!");
        return; // Exit after merging to avoid index issues
      }
    }
  }
}

// --- Clear All Boxes Button ---
clearBtn.addEventListener("click", () => {
  boxes.length = 0; // Clear the boxes array
  requestDraw();
  console.log("All boxes removed.");
});

// Initial draw call
requestDraw();
