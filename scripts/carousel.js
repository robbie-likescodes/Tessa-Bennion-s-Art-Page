// carousel.js — scroll-snap carousel with dots + arrow controls
export function initCarousel(){
  const frame = document.querySelector('[data-carousel-frame]');
  const rail  = frame?.querySelector('.rail');
  const figs  = [...rail?.querySelectorAll('figure') || []];
  const dots  = [...document.querySelectorAll('.dots .dot')];
  const prev  = document.querySelector('.car-btn--prev');
  const next  = document.querySelector('.car-btn--next');
  if(!frame || !rail || !figs.length) return;

  const gapPx = () => parseFloat(getComputedStyle(rail).gap || 0);
  const colWidth = () => {
    const desktop = window.matchMedia('(min-width:900px)').matches;
    return frame.clientWidth * (desktop ? 0.48 : 0.88);
  };

  const syncDots = () => {
    const w = colWidth() + gapPx();
    const idx = Math.round(frame.scrollLeft / w);
    dots.forEach((d,i)=> d.classList.toggle('is-active', i===Math.max(0, Math.min(idx, dots.length-1))));
  };

  const scrollByCols = (n=1) => {
    const dist = (colWidth() + gapPx()) * n;
    frame.scrollBy({ left: dist, behavior: 'smooth' });
  };

  prev?.addEventListener('click', ()=> scrollByCols(-1));
  next?.addEventListener('click', ()=> scrollByCols( 1));
  frame.addEventListener('scroll', ()=> requestAnimationFrame(syncDots));
  window.addEventListener('resize', ()=> requestAnimationFrame(syncDots));
  syncDots();

  // Optional: allow arrow keys to navigate when frame is focused
  frame.tabIndex = 0;
  frame.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') scrollByCols(1);
    if(e.key === 'ArrowLeft')  scrollByCols(-1);
  });
}
