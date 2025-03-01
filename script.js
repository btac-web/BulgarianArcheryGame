const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const arrowsLeftDisplay = document.getElementById('arrowsLeft');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');

let arrowsLeft = 15;
let timeLeft = 120;
let score = 0;
let isDrawing = false;
let drawProgress = 0;
let arrow = { x: canvas.width / 2, y: canvas.height - 50, angle: 0, power: 0 };

// Звукови ефекти
const drawSound = new Audio('sounds/draw.mp3');
const shootSound = new Audio('sounds/shoot.mp3');

// Рисуване на лъка и тетивата
function drawBow() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - 50);
    ctx.lineTo(canvas.width / 2 + 50 * Math.cos(arrow.angle), canvas.height - 50 + 50 * Math.sin(arrow.angle));
    ctx.strokeStyle = '#8B4513'; // Кафяв цвят за лъка
    ctx.lineWidth = 5;
    ctx.stroke();

    // Рисуване на опъната тетива
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height - 50);
        ctx.lineTo(canvas.width / 2 + 50 * Math.cos(arrow.angle), canvas.height - 50 + 50 * Math.sin(arrow.angle));
        ctx.strokeStyle = '#000'; // Черен цвят за тетивата
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Рисуване на стрелата
function drawArrow() {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(arrow.x, arrow.y);
        ctx.lineTo(arrow.x + 20 * Math.cos(arrow.angle), arrow.y + 20 * Math.sin(arrow.angle));
        ctx.strokeStyle = '#000'; // Черен цвят за стрелата
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

// Обновяване на играта
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBow();
    drawArrow();
    requestAnimationFrame(updateGame);
}

// Управление с мишката
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
    drawSound.play(); // Звук за опъване на тетивата
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        arrow.angle = Math.atan2(mouseY - (canvas.height - 50), mouseX - (canvas.width / 2));
        drawProgress = Math.min(1, Math.hypot(mouseX - (canvas.width / 2), mouseY - (canvas.height - 50)) / 100);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        isDrawing = false;
        shootSound.play(); // Звук за изстрелване
        shootArrow();
    }
});

// Функция за изстрелване
function shootArrow() {
    if (arrowsLeft > 0) {
        arrowsLeft--;
        arrowsLeftDisplay.textContent = arrowsLeft;

        // Логика за изстрелване на стрелата
        const hit = checkIfArrowHitsTarget();
        if (hit) {
            score += calculatePoints(hit);
            scoreDisplay.textContent = score;
        }
    }
}

// Проверка за попадение
function checkIfArrowHitsTarget() {
    // Симулация на попадение
    return Math.random() > 0.5; // Примерна логика
}

// Изчисляване на точките
function calculatePoints(hit) {
    return Math.floor(Math.random() * 7) + 1; // От 1 до 7 точки
}

// Стартиране на играта
updateGame();
