const tapOverlay = document.getElementById("tapOverlay");
const messageCard = document.getElementById("messageCard");
const garden = document.getElementById("garden");
const bgm = document.getElementById("bgm");

tapOverlay.onclick = () => {
  tapOverlay.style.opacity = "0";
  setTimeout(() => tapOverlay.remove(), 600);
  bgm.play();
  createFlowers();
  setTimeout(showMessage, 4000);
};

function createFlowers() {
  for (let i = 0; i < 15; i++) {
    let f = document.createElement("div");
    f.className = "flower";
    f.style.left = Math.random() * 100 + "vw";

    f.innerHTML = `
      <div class="stem"></div>
      <div class="petals">
        <div></div><div></div><div></div><div></div>
      </div>
    `;
    garden.appendChild(f);
  }
}

function showMessage() {
  messageCard.style.opacity = "1";
  messageCard.style.transform = "translate(-50%, -50%) scale(1)";
  throwConfetti();
}

function throwConfetti() {
  for (let i = 0; i < 30; i++) {
    let h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💗";
    h.style.left = Math.random() * 100 + "vw";
    h.style.top = "70vh";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }
}
