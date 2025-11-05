
/* New behavior:
 - Show overlay "Tap to continue" initially.
 - On first user tap/click, remove overlay and start controlled flower growth sequence.
 - After flowers finish growing, show "Hope this makes you smile" message.
 - Play audio from start on user click (handles autoplay policies).
*/
document.addEventListener('DOMContentLoaded', function(){
  const overlay = document.getElementById('overlay');
  const container = document.getElementById('container');
  const flowers = Array.from(document.querySelectorAll('.flower'));
  const message = document.getElementById('message');
  const song = document.getElementById('song');
  let started = false;

  // populate centers
  flowers.forEach(f => {
    const c = document.createElement('div');
    c.className = 'center';
    f.appendChild(c);
  });

  // click handler
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
      // longer delay for later flowers to give wave effect
      const delay = idx * 420;
      setTimeout(()=>{
        f.classList.add('grow');
        // after fully grown, add slight wiggle for lifelike motion
        setTimeout(()=> f.classList.add('slight-wiggle'), 900);
      }, delay);
    });

    // show message after last flower grown (calculate)
    const totalDelay = (flowers.length - 1) * 420 + 1100 + 300;
    setTimeout(()=>{
      message.classList.remove('hidden');
      message.classList.add('visible');
      // ensure focus for screen readers
      message.setAttribute('aria-hidden','false');
    }, totalDelay);
  }

  // overlay click anywhere
  overlay.addEventListener('click', startSequence);
  // also allow container click in case overlay removed by focus
  container.addEventListener('click', startSequence);
  // keyboard accessibility
  container.addEventListener('keydown', function(e){
    if((e.key === 'Enter' || e.key === ' ') && !started) startSequence();
  });
});
