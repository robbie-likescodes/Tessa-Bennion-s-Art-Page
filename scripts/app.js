// app.js — bootstrap site enhancements
import { initCarousel } from './carousel.js';

// Ombré slider fill + label
function initOmbreRange(sel, outSel){
  const el = document.querySelector(sel), out = document.querySelector(outSel);
  if(!el) return;
  const paint = () => {
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty('--pct', pct + '%');
    if (out) out.textContent = el.value;
  };
  el.addEventListener('input', paint);
  paint();
}

// Super simple lightbox (no libs)
function initLightbox(){
  const overlay = document.getElementById('lightbox');
  const img = overlay?.querySelector('.lightbox__img');
  const meta = overlay?.querySelector('#lightboxMeta');
  const closeBtn = overlay?.querySelector('.lightbox__close');

  function open(e){
    const t = e.currentTarget;
    overlay.hidden = false;
    img.src = t.src;
    img.alt = t.alt || '';
    meta.textContent = t.alt || '';
    document.body.style.overflow = 'hidden';
  }
  function close(){
    overlay.hidden = true;
    img.src = '';
    meta.textContent = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(el=>{
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', open);
  });

  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e)=> { if(e.target === overlay) close(); });
  window.addEventListener('keydown', (e)=> { if(e.key==='Escape' && !overlay.hidden) close(); });
}

// Hidden admin link via long-press on logo
function initHiddenAdmin(){
  const logo = document.getElementById('siteLogo');
  const link = document.getElementById('adminLink');
  if(!logo || !link) return;
  let timer;
  const show = ()=> link.style.display = 'inline-block';
  ['mousedown','touchstart'].forEach(ev=> logo.addEventListener(ev, ()=> timer = setTimeout(show, 1500)));
  ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev=> logo.addEventListener(ev, ()=> clearTimeout(timer)));
  // Keyboard easter egg: g a l l e r y
  const seq=['g','a','l','l','e','r','y']; let buf=[];
  window.addEventListener('keydown', e=>{
    buf.push(e.key.toLowerCase()); if (buf.length>seq.length) buf.shift();
    if (seq.every((c,i)=> buf[i]===c)) show();
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initOmbreRange('#yearRange', '#yearOut');
  initCarousel();
  initLightbox();
  initHiddenAdmin();
});
