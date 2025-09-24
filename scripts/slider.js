// slider.js — export if you want a separate module for ranges
export function initOmbreRange(sel, outSel){
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
