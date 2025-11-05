
/* Floating heart pop message style (option 3) + mixed flower styles */
document.addEventListener('DOMContentLoaded', function(){
  const overlay = document.getElementById('overlay');
  const container = document.getElementById('container');
  const flowers = Array.from(document.querySelectorAll('.flower'));
  const message = document.getElementById('message');
  const song = document.getElementById('song');
  const heartsContainer = document.getElementById('hearts');
  let started = false;

  // create layered petals & centers
  flowers.forEach((f, idx) => {
    // main rounded petal layer
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.zIndex = 5;
    // smaller pointed layer for sakura feel
    const petal2 = document.createElement('div');
    petal2.className = 'petal pointed';
    petal2.style.zIndex = 4;
    // rotate different petals for variety
    petal.style.transform = 'translateX(-50%) rotate(' + (idx*8) + 'deg)';
    petal2.style.transform = 'translateX(-50%) rotate(' + (idx*12) + 'deg) scale(0.92)';
    f.appendChild(petal);
    f.appendChild(petal2);

    const c = document.createElement('div');
    c.className = 'center';
    f.appendChild(c);
  });

  function spawnHeart(xPercent){
    const h = document.createElement('div');
    h.className = 'heart';
    // random horizontal spread
    const left = 10 + Math.random()*80;
    h.style.left = left + '%';
    h.style.bottom = '10px';
    heartsContainer.appendChild(h);
    // random size
    const size = 12 + Math.random()*18;
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.style.transform = 'rotate(-45deg) scale(0.6)';
    h.style.opacity = 0;
    // animate using setTimeout to stagger start
    setTimeout(()=>{
      h.style.transition = 'opacity 200ms';
      h.style.opacity = 1;
      h.style.animation = 'floatUp 1600ms ease-out forwards';
    }, 50 + Math.random()*200);
    // remove after animation
    setTimeout(()=> h.remove(), 1900);
  }

  function startSequence(){
    if(started) return;
    started = true;
    // hide overlay smoothly
    overlay.style.transition = 'opacity 400ms ease';
    overlay.style.opacity = '0';
    setTimeout(()=> overlay.remove(), 450);

    // ensure audio starts at 0 and play
    try{ song.currentTime = 0; }catch(e){}
    song.play().catch(e=>{ console.warn('Playback blocked', e); });

    // stagger grow each flower to create tall smooth growth
    flowers.forEach((f, idx) => {
      const delay = idx * 420;
      setTimeout(()=>{
        f.classList.add('grow');
        setTimeout(()=> f.classList.add('slight-wiggle'), 900);
      }, delay);
    });

    // show message after last flower grown
    const totalDelay = (flowers.length - 1) * 420 + 1200 + 350;
    setTimeout(()=>{
      message.classList.remove('hidden');
      message.classList.add('visible');
      message.setAttribute('aria-hidden','false');
      // spawn hearts for 2 seconds
      const interval = setInterval(()=> spawnHeart(), 160);
      setTimeout(()=> clearInterval(interval), 2200);
    }, totalDelay);
  }

  overlay.addEventListener('click', startSequence);
  overlay.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' ') startSequence(); });
  container.addEventListener('click', startSequence);
  container.addEventListener('keydown', function(e){ if((e.key==='Enter'||e.key===' ') && !started) startSequence(); });
});
