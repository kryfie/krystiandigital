/* krystian.digital — karuzela projektów wyróżnionych przez Pages CMS. */
(()=>{
  'use strict';
  const carousel=document.querySelector('[data-featured-carousel]');
  if(!carousel) return;
  const slides=[...carousel.querySelectorAll('[data-featured-slide]')];
  const thumbs=[...carousel.querySelectorAll('[data-featured-thumb]')];
  const prev=carousel.querySelector('[data-featured-prev]');
  const next=carousel.querySelector('[data-featured-next]');
  const progress=carousel.querySelector('[data-featured-progress]');
  if(slides.length<2) return;
  let active=0;
  function show(index){
    active=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.hidden=i!==active;});
    thumbs.forEach((thumb,i)=>thumb.setAttribute('aria-current',String(i===active)));
    if(progress) progress.textContent=String(active+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  }
  prev?.addEventListener('click',()=>show(active-1));
  next?.addEventListener('click',()=>show(active+1));
  thumbs.forEach((thumb,i)=>thumb.addEventListener('click',()=>show(i)));
  carousel.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'){e.preventDefault();show(active+1);}
    else if(e.key==='ArrowLeft'){e.preventDefault();show(active-1);}
  });
  let startX=null,startY=null;
  const stage=carousel.querySelector('.featured-stage');
  stage?.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;startX=e.touches[0].clientX;startY=e.touches[0].clientY;},{passive:true});
  stage?.addEventListener('touchend',e=>{
    if(startX===null||!e.changedTouches.length)return;
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.3)show(active+(dx<0?1:-1));
    startX=null;startY=null;
  },{passive:true});
  show(0);
})();
