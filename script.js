
const garden = document.getElementById("garden");
const message = document.getElementById("message");
const tap = document.getElementById("tapScreen");
const music = document.getElementById("bgMusic");

for(let i = 0; i < 12; i++){
  const flower = document.createElement("div");
  flower.classList.add("flower");

  const stem = document.createElement("div");
  stem.classList.add("stem");
  flower.appendChild(stem);

  for(let p = 0; p < 5; p++){
    const petal = document.createElement("div");
    petal.classList.add("petal");
    flower.appendChild(petal);
  }

  garden.appendChild(flower);
}

tap.addEventListener("click", () => {
  tap.style.opacity = "0";
  setTimeout(()=> tap.style.display="none", 600);

  garden.style.opacity = "1";
  music.play();

  setTimeout(() => {
    message.style.opacity = "1";
    message.style.transform = "translateY(0)";
  }, 3500);
});

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 3000);
}

setInterval(createSparkle, 900);
