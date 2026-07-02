/* ============ 479 CODE — shared behaviour ============ */
const REDUCE=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const WA_NUMBER='2347074733491'; /* <-- update once: every WhatsApp link on the site uses this */
const EMAIL='479code@gmail.com';

/* ------- theme (dark default, remembered) ------- */
(function(){
  let saved=null;
  try{saved=localStorage.getItem('479theme');}catch(e){}
  if(saved==='light')document.documentElement.setAttribute('data-theme','light');
  document.addEventListener('DOMContentLoaded',()=>{
    const b=document.getElementById('themeBtn');
    if(!b)return;
    const sync=()=>{b.textContent=document.documentElement.getAttribute('data-theme')==='light'?'◐':'◑';
      b.setAttribute('aria-label','Switch to '+(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light')+' mode');};
    sync();
    b.addEventListener('click',()=>{
      const light=document.documentElement.getAttribute('data-theme')==='light';
      if(light)document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme','light');
      try{localStorage.setItem('479theme',light?'dark':'light');}catch(e){}
      sync();
    });
  });
})();

document.addEventListener('DOMContentLoaded',()=>{

  /* ------- mobile menu ------- */
  const mb=document.getElementById('menuBtn'),links=document.querySelector('.nav-links');
  if(mb&&links){
    mb.addEventListener('click',()=>{
      const open=links.classList.toggle('open');
      mb.textContent=open?'✕':'☰';
      mb.setAttribute('aria-expanded',open);
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');mb.textContent='☰';}));
  }

  /* ------- preloader ------- */
  const l=document.getElementById('loader');
  if(l){window.addEventListener('load',()=>setTimeout(()=>l.classList.add('done'),REDUCE?0:900));
    setTimeout(()=>l.classList.add('done'),2500);} /* failsafe */

  /* ------- scroll progress + back-to-top ------- */
  const p=document.getElementById('progress'),t=document.getElementById('toTop');
  if(p||t){addEventListener('scroll',()=>{
    const h=document.documentElement;
    if(p)p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
    if(t)t.classList.toggle('show',h.scrollTop>600);
  },{passive:true});}
  if(t)t.addEventListener('click',()=>scrollTo({top:0,behavior:REDUCE?'auto':'smooth'}));

  /* ------- custom scanner cursor ------- */
  if(matchMedia('(pointer:fine)').matches&&!REDUCE){
    const c=document.getElementById('cursor');
    if(c){let x=0,y=0,cx=0,cy=0;
      addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
      (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+(cx-17)+'px,'+(cy-17)+'px)';requestAnimationFrame(loop)})();
      document.querySelectorAll('a,button,.svc,.exh').forEach(el=>{
        el.addEventListener('mouseenter',()=>c.classList.add('hov'));
        el.addEventListener('mouseleave',()=>c.classList.remove('hov'));
      });}
  }

  /* ------- hero barcode field ------- */
  const field=document.getElementById('barfield');
  if(field){
    const n=Math.max(16,Math.floor(innerWidth/34));
    const frag=document.createDocumentFragment();
    for(let i=0;i<n;i++){
      const b=document.createElement('div');b.className='bar';
      b.style.height=(18+Math.random()*82)+'%';
      if(Math.random()<0.25)b.style.flex='0.45';
      if(Math.random()<0.15)b.style.flex='1.8';
      b.style.animationDelay=(i*0.045)+'s';
      frag.appendChild(b);
    }
    field.appendChild(frag);
    if(!REDUCE)setInterval(()=>{
      const bars=field.querySelectorAll('.bar');
      const b=bars[Math.floor(Math.random()*bars.length)];
      if(b){b.style.transition='height .8s cubic-bezier(.2,.8,.2,1)';b.style.height=(18+Math.random()*82)+'%';}
    },380);
  }

  /* ------- scan word cycler ------- */
  const sw=document.getElementById('scanWord');
  if(sw&&!REDUCE){
    const words=['scannable','trackable','automated','profitable','unmistakable'];let i=0;
    sw.style.transition='opacity .26s';
    setInterval(()=>{sw.style.opacity=0;
      setTimeout(()=>{i=(i+1)%words.length;sw.textContent=words[i];sw.style.opacity=1;},260);},2600);
  }

  /* ------- service mini barcodes ------- */
  document.querySelectorAll('.minibar').forEach(mb2=>{
    for(let i=0;i<11;i++){
      const bar=document.createElement('i');
      bar.style.height=(25+Math.random()*75)+'%';
      bar.style.setProperty('--hh',(25+Math.random()*75)+'%');
      if(Math.random()<0.3)bar.style.width='2px';
      mb2.appendChild(bar);
    }
  });

  /* ------- scroll reveals ------- */
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ------- animated counters ------- */
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,end=+el.dataset.count,dur=1400,t0=performance.now();
    (function tick(t){
      const pr=Math.min(1,((t||performance.now())-t0)/dur),eased=1-Math.pow(1-pr,3);
      el.textContent=Math.round(end*eased);
      if(pr<1)requestAnimationFrame(tick);
    })();
    cio.unobserve(el);
  }),{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

  /* ------- tilt on mocks ------- */
  if(matchMedia('(pointer:fine)').matches&&!REDUCE){
    document.querySelectorAll('.tilt').forEach(m=>{
      m.addEventListener('mousemove',e=>{
        const r=m.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-.5)*-6;
        const ry=((e.clientX-r.left)/r.width-.5)*6;
        m.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg)';
      });
      m.addEventListener('mouseleave',()=>{m.style.transform='none'});
    });
  }

  /* ------- terminal typing ------- */
  const body=document.getElementById('termBody');
  if(body){
    const lines=[
      {t:'$ 479code init --client "your-business"',c:''},
      {t:'> scanning operations .......... done',c:'k'},
      {t:'> leaks found: manual records, blind spots, lost hours',c:'k'},
      {t:'$ 479code build --stack web,mobile,telematics,dashboards',c:''},
      {t:'> compiling your custom system .......... done',c:'k'},
      {t:'> automations armed · alerts live · reports scheduled',c:'k'},
      {t:'$ 479code deploy --to production',c:''},
      {t:'✓ SYSTEM LIVE — your business is now scannable.',c:'ok'}
    ];
    let started=false;
    const tio=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting||started)return;
      started=true;tio.disconnect();
      if(REDUCE){body.innerHTML=lines.map(l2=>'<div class="ln '+l2.c+'">'+l2.t+'</div>').join('');return;}
      let li=0;
      (function typeLine(){
        if(li>=lines.length)return;
        const l2=lines[li],div=document.createElement('div');
        div.className='ln '+l2.c;body.appendChild(div);
        const caret=document.createElement('span');caret.className='caret';
        let ci=0;
        (function ch(){
          div.textContent=l2.t.slice(0,ci);div.appendChild(caret);
          if(ci<l2.t.length){ci++;setTimeout(ch,l2.t.startsWith('$')?26:12);}
          else{caret.remove();li++;setTimeout(typeLine,l2.t.startsWith('$')?300:140);}
        })();
      })();
    }),{threshold:0.4});
    tio.observe(body);
  }

  /* ------- project filtering ------- */
  const btns=document.querySelectorAll('.filter-btn');
  if(btns.length){
    const cards=document.querySelectorAll('.exh-grid .exh');
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.remove('on'));b.classList.add('on');
      const f=b.dataset.f;
      cards.forEach(c=>{
        const show=f==='all'||c.dataset.cat===f;
        if(show){c.classList.remove('hide');
          if(!REDUCE){c.style.opacity=0;c.style.transform='translateY(14px)';
            requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.opacity=1;c.style.transform='none';}));}
        }else c.classList.add('hide');
      });
    }));
  }

  /* ------- WhatsApp links + form ------- */
  document.querySelectorAll('[data-wa]').forEach(a=>a.href='https://wa.me/'+WA_NUMBER);
  document.querySelectorAll('[data-mail]').forEach(a=>{a.href='mailto:'+EMAIL;if(a.dataset.mail==='text')a.textContent='✉ '+EMAIL;});
  const form=document.getElementById('projForm');
  if(form)form.addEventListener('submit',e=>{
    e.preventDefault();
    const g=id=>document.getElementById(id).value.trim();
    const msg='Hello 479 CODE!%0A%0AName: '+encodeURIComponent(g('fName'))+
      '%0ABusiness: '+encodeURIComponent(g('fBiz')||'—')+
      '%0AService: '+encodeURIComponent(g('fType'))+
      '%0A%0AProject: '+encodeURIComponent(g('fMsg')||'(details to discuss)');
    open('https://wa.me/'+WA_NUMBER+'?text='+msg,'_blank');
  });
});
