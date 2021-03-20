let drag = false;

let control = document.querySelector(".control");
let controlAngle = 0;
control.addEventListener("mousedown", onControlTouchStart);
control.addEventListener("touchstart", onControlTouchStart);
window.addEventListener("mousemove", onControlTouchMove);
window.addEventListener("touchmove", onControlTouchMove);
window.addEventListener("mouseup", onControlTouchEnd);
window.addEventListener("touchend", onControlTouchEnd);
function onControlTouchStart(event) {
	drag = true;
}
function onControlTouchMove(event) {
	if (!drag) return;
	let bound = control.getBoundingClientRect();
	let tx, ty;
	if (event.type === "touchmove") {
		tx = event.touches[0].clientX;
		ty = event.touches[0].clientY;
	} else {
		tx = event.clientX;
		ty = event.clientY;
	}
	let dx = tx - (bound.left + (bound.right - bound.left) * 0.5);
	let dy = ty - (bound.top + (bound.bottom - bound.top) * 0.5);
	controlAngle = Math.atan2(dy, dx);
	// if (controlAngle > Math.PI * 0.5) controlAngle = Math.PI * 0.5;
	// else if (controlAngle < -Math.PI * 0.5) controlAngle = -Math.PI * 0.5;
	control.style.transform = "rotate(" + String(180 * controlAngle / Math.PI) + "deg)";
}
function onControlTouchEnd(event) {
	drag = false;
}

let volumne = document.querySelector(".volume");

let ball = document.querySelector(".ball");
let ballX = 0;
let ballVx = 0;

requestAnimationFrame(onFrame);
function onFrame() {
	let ax = 0.1 * Math.sin(controlAngle);
	ballVx += ax;
	ballX += ballVx;
	if (ballX > 100) {
		ballX = 100;
		ballVx *= -0.5;
	} else if (ballX < -100) {
		ballX = -100;
		ballVx *= -0.5;
	}
	ball.style.left = "calc(50% - 8px + " + String(ballX) + "px)";
	
	volumne.textContent = String(Math.round(50 + 50 * ballX / 100));
	requestAnimationFrame(onFrame);
}