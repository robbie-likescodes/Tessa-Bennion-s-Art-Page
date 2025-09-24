// carousel.js — scroll-snap carousel dot sync
export function initCarousel(){
  const frame = document.querySelector('.carousel .frame');
  const dots  = [...document.querySelectorAll('.carousel .dot')];
  if(!frame || !dots.length) return;

  const sync = () => {
    const figWidth = frame.clientWidth * (window.matchMedia('(min-width:900px)').matches ? 0.48 : 0.80);
    const idx = Math.round(frame.scrollLeft / (figWidth + parseFloat(getComputedStyle(frame).gap || 0)));
    dots.forEach((d,i)=> d.classList.toggle('is-active', i===Math.max(0, Math.min(idx, dots.length-1))));
  };

  frame.addEventListener('scroll', ()=> requestAnimationFrame(sync));
  window.addEventListener('resize', ()=> requestAnimationFrame(sync));
  sync();
}
