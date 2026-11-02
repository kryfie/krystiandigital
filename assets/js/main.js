(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.navlinks');
  if(navToggle && menu){
    navToggle.addEventListener('click',()=>{
      const active = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(active));
      menu.classList.toggle('is-open',active);
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('is-open');navToggle.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ menu.classList.remove('is-open'); navToggle.setAttribute('aria-expanded','false'); } });
  }
  const filters = document.querySelectorAll('[data-filter]');
  const archive = document.querySelectorAll('[data-category]');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    const cat=btn.dataset.filter;
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    archive.forEach(item=>{item.hidden=(cat!=='all' && item.dataset.category!==cat)});
  }));
  // GitHub Pages has no server-side form handler. Formspree is optional and must be configured.
  const form=document.getElementById('lead-form');
  if(form){
    const status=form.querySelector('.form-status');
    const submit=form.querySelector('button[type=submit]');
    const contactRadios=form.querySelectorAll('input[name="preferred_contact"]');
    const phone=form.querySelector('#tel');
    const email=form.querySelector('#email');
    const phoneRequired=form.querySelector('#phone-required');
    const emailRequired=form.querySelector('#email-required');
    const callbackBox=form.querySelector('#callback-hours');
    const callbackHours=form.querySelector('#preferred-hours');
    const syncContactPreference=()=>{
      const wantsPhone=form.querySelector('input[name="preferred_contact"]:checked')?.value==='Telefon';
      phone.required=wantsPhone;
      email.required=!wantsPhone;
      callbackBox.hidden=!wantsPhone;
      callbackHours.disabled=!wantsPhone;
      callbackHours.required=wantsPhone;
      phoneRequired.textContent=wantsPhone?'*':'(opcjonalnie)';
      emailRequired.textContent=wantsPhone?'(opcjonalnie)':'*';
    };
    contactRadios.forEach(radio=>radio.addEventListener('change',syncContactPreference));
    syncContactPreference();
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      const formId=(window.KRYSTIAN_CONFIG?.formspreeId||'').trim();
      status.className='form-status';
      if(!/^([a-zA-Z0-9]{6,})$/.test(formId)){
        status.textContent='Formularz nie jest jeszcze podłączony do odbierania wiadomości. Możesz skontaktować się ze mną przez TikTok — link poniżej.';
        status.classList.add('error');
        return;
      }
      submit.disabled=true;submit.textContent='Wysyłam…';
      try{
        const res=await fetch('https://formspree.io/f/'+encodeURIComponent(formId),{
          method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)
        });
        if(!res.ok) throw new Error('HTTP '+res.status);
        form.reset();syncContactPreference();status.textContent='Dziękuję! Wiadomość została wysłana. Odezwę się osobiście.';status.classList.add('success');
      }catch(err){ status.textContent='Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz do mnie na TikToku.';status.classList.add('error'); }
      finally{submit.disabled=false;submit.innerHTML='Wyślij zapytanie <span class="arrow" aria-hidden="true">↗</span>';}
    });
  }
})();
