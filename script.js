function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

function getGreeting(hour) {
    if (hour >= 5 && hour < 12) return "GOOD MORNING";
    else if (hour >= 12 && hour < 17) return "GOOD AFTERNOON";
    else if (hour >= 17 && hour < 21) return "GOOD EVENING";
    else return "GOOD NIGHT";
}


function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const greeting = getGreeting(hours);
    hours = hours % 12 || 12;

    const timeString = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)} ${ampm}`;
    const dateString = now.toDateString();

    document.getElementById("clock").innerText = timeString;
    document.getElementById("date").innerText = dateString;
    document.getElementById("greeting").innerText = greeting;
}


const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggleBtn.innerText =
        document.body.classList.contains("light") ? "Switch to Dark Theme" : "Switch to Light Theme";
});


const bgMusic = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
bgMusic.loop = true;
bgMusic.volume = 0.1;
document.body.addEventListener("click", () => {
    bgMusic.play();
}, { once: true }); 


function speakGreeting() {
    const hour = new Date().getHours();
    const greeting = getGreeting(hour);
    const message = new SpeechSynthesisUtterance(`Hello! ${greeting}`);
    message.rate = 1;
    message.pitch = 1;
    speechSynthesis.speak(message);
}
window.onload = () => {
    speakGreeting();
    initStars(); 
};


function initStars() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "white";
        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.y += star.speed;
            if (star.y > height) {
                star.y = 0;
                star.x = Math.random() * width;
            }
        });
        requestAnimationFrame(animateStars);
    }

    animateStars();
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}


setInterval(updateClock, 1000);
updateClock();