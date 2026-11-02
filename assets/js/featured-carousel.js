/* krystian.digital — karuzela wyróżnionych projektów z Pages CMS. */
(()=>{
  'use strict';
  const carousel=document.querySelector('[data-featured-carousel]');
  if(!carousel) return;
  const slides=[...carousel.querySelectorAll('[data-featured-slide]')];
  const thumbs=[...carousel.querySelectorAll('[data-featured-thumb]')];
  const prevButtons=[...carousel.querySelectorAll('[data-featured-prev]')];
  const nextButtons=[...carousel.querySelectorAll('[data-featured-next]')];
  const progress=carousel.querySelector('[data-featured-progress]');
  const thumbStrip=carousel.querySelector('.featured-thumbnails');
  if(slides.length<2) return;
  let active=0;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function keepThumbnailVisible(thumb){
    if(!thumbStrip||!thumb)return;
    // Unikamy skoków całej strony: przewijamy wyłącznie pasek miniatur.
    const target=thumb.offsetLeft+(thumb.offsetWidth/2)-(thumbStrip.clientWidth/2);
    const maxScroll=Math.max(0,thumbStrip.scrollWidth-thumbStrip.clientWidth);
    thumbStrip.scrollTo({left:Math.max(0,Math.min(target,maxScroll)),behavior:'auto'});
  }
  function show(index,shouldScroll=true){
    active=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.hidden=i!==active;});
    thumbs.forEach((thumb,i)=>{
      thumb.setAttribute('aria-current',String(i===active));
      thumb.setAttribute('aria-pressed',String(i===active));
    });
    if(progress)progress.textContent=String(active+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    if(shouldScroll)keepThumbnailVisible(thumbs[active]);
  }
  prevButtons.forEach(button=>button.addEventListener('click',()=>show(active-1)));
  nextButtons.forEach(button=>button.addEventListener('click',()=>show(active+1)));
  thumbs.forEach((thumb,i)=>thumb.addEventListener('click',()=>show(i)));
  carousel.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select'))return;
    if(e.key==='ArrowRight'){e.preventDefault();show(active+1);}
    else if(e.key==='ArrowLeft'){e.preventDefault();show(active-1);}
  });
  let startX=null,startY=null;
  const stage=carousel.querySelector('.featured-stage');
  stage?.addEventListener('touchstart',e=>{
    if(e.touches.length!==1)return;
    startX=e.touches[0].clientX;startY=e.touches[0].clientY;
  },{passive:true});
  stage?.addEventListener('touchend',e=>{
    if(startX===null||!e.changedTouches.length)return;
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)show(active+(dx<0?1:-1));
    startX=null;startY=null;
  },{passive:true});
  show(0,false);
})();
