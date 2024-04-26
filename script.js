const names = [];
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;

document.getElementById('nameInput').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        addName();
        event.preventDefault(); // Prevent form submission on Enter press
    }
});

function addName() {
    const nameInput = document.getElementById('nameInput');
    if (nameInput.value.trim() !== '') {
        names.push(nameInput.value.trim());
        nameInput.value = '';
        drawWheel();
    }
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const angleStep = (2 * Math.PI) / names.length;

    names.forEach((name, index) => {
        const angle = angleStep * index;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, angle + angleStep);
        ctx.closePath();
        ctx.fillStyle = `hsl(${index / names.length * 360}, 100%, 50%)`;
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + angleStep / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText(name, radius - 10, 0);
        ctx.restore();
    });
}

function spinWheel() {
    const spinDuration = 10000; // duration in milliseconds
    const spinTimes = 5; // number of full rotations
    const totalAngle = 360 * spinTimes + Math.random() * 360;
    let currentAngle = 0;
    const start = Date.now();

    const interval = setInterval(() => {
        const now = Date.now();
        const progress = (now - start) / spinDuration;
        if (progress >= 1) {
            clearInterval(interval);
            currentAngle = totalAngle;
            announceWinner(currentAngle);
        } else {
            currentAngle = totalAngle * progress;
            drawWheelRotated(currentAngle % 360);
        }
    }, 1000 / 60); // approximately 60 FPS
}

function drawWheelRotated(angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    drawWheel();
    ctx.restore();
}

function announceWinner(finalAngle) {
    const winningIndex = Math.floor(((360 - (finalAngle % 360)) / 360) * names.length);
    alert(`The winner is: ${names[winningIndex]}`);
}

function clearNames() {
    names.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}