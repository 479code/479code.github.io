/* ============ 479 CODE — shared behaviour ============ */
const REDUCE=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const WA_NUMBER='2340000000000'; /* <-- update once: every WhatsApp link on the site uses this */
const EMAIL='hello@479code.com';

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

/* ============ v4 ADDITIONS ============ */

/* --- Project Estimator --- */
(function(){
  const wrap=document.getElementById('estimator');
  if(!wrap)return;
  const steps=[
    {q:"What do you need?",opts:["Website","Web App","Mobile App (Android/iOS)","Telematics System","Operational Dashboard","Business Consultancy","Full Digital Package"]},
    {q:"What's your timeline?",opts:["ASAP — within 2 weeks","1 month","2–3 months","Flexible — quality first"]},
    {q:"What's your business size?",opts:["Solo / Startup","Small business (1–20 staff)","Medium business (20–100 staff)","Large / Enterprise (100+ staff)"]},
    {q:"Do you need ongoing support?",opts:["One-time build only","3 months support","6 months support","Annual retainer"]}
  ];
  const prices={
    "Website":{base:"₦150,000",range:"₦150k – ₦600k"},
    "Web App":{base:"₦400,000",range:"₦400k – ₦1.5M"},
    "Mobile App (Android/iOS)":{base:"₦600,000",range:"₦600k – ₦2.5M"},
    "Telematics System":{base:"₦800,000",range:"₦800k – ₦3M"},
    "Operational Dashboard":{base:"₦300,000",range:"₦300k – ₦1.2M"},
    "Business Consultancy":{base:"₦100,000",range:"₦100k – ₦500k"},
    "Full Digital Package":{base:"₦1,200,000",range:"₦1.2M – ₦5M+"}
  };
  let current=0,selections=[];
  const bar=wrap.querySelector('.est-bar-fill');
  const prog=wrap.querySelector('.est-progress');
  const result=wrap.querySelector('.est-result');
  const stepsEl=wrap.querySelectorAll('.est-step');

  function show(i){
    stepsEl.forEach((s,idx)=>{s.classList.toggle('active',idx===i)});
    bar.style.width=((i/steps.length)*100)+'%';
    prog.textContent='Step '+(i+1)+' of '+steps.length;
  }
  wrap.querySelectorAll('.est-opt').forEach(o=>{
    o.addEventListener('click',function(){
      this.closest('.est-step').querySelectorAll('.est-opt').forEach(x=>x.classList.remove('selected'));
      this.classList.add('selected');
      selections[current]=this.textContent;
    });
  });
  const nextBtn=wrap.querySelector('#estNext');
  const backBtn=wrap.querySelector('#estBack');
  if(nextBtn)nextBtn.addEventListener('click',()=>{
    if(!selections[current]){wrap.querySelector('.est-step.active .est-opt').classList.add('selected');selections[current]=wrap.querySelector('.est-step.active .est-opt').textContent;}
    if(current<steps.length-1){current++;show(current);}
    else{
      const p=prices[selections[0]]||{range:"Custom quote"};
      wrap.querySelector('.est-price').textContent=p.range;
      stepsEl.forEach(s=>s.classList.remove('active'));
      result.classList.add('show');
      bar.style.width='100%';
      prog.textContent='Complete';
    }
  });
  if(backBtn)backBtn.addEventListener('click',()=>{
    if(result.classList.contains('show')){result.classList.remove('show');current=steps.length-1;show(current);}
    else if(current>0){current--;show(current);}
  });
  show(0);
})();

/* --- Live AI Chat --- */
(function(){
  const btn=document.getElementById('chatBtn');
  const box=document.getElementById('chatBox');
  const closeBtn=document.getElementById('chatClose');
  const msgs=document.getElementById('chatMsgs');
  const input=document.getElementById('chatInput');
  const send=document.getElementById('chatSend');
  if(!btn||!box)return;

  const WA=typeof WA_NUMBER!=='undefined'?WA_NUMBER:'2340000000000';
  let history=[{role:'user',content:`You are the friendly AI assistant for 479 CODE, a Nigerian software and operational systems company based in Lagos. You help website visitors learn about 479 CODE's services: Website Development, App Development (Web/Android/iOS), Telematics & Fleet Tracking, Business Consultancy, Fuel TrackPro system, Smart Attendance system, and Fleet Operations Suite. Keep answers concise, professional and friendly. If asked about pricing, say estimates start from ₦150,000 for websites and encourage them to use the estimator or contact the team. Always end with an invitation to start a project. The WhatsApp number is ${WA}.`}];

  btn.addEventListener('click',()=>{
    box.classList.toggle('open');
    if(box.classList.contains('open')&&msgs.children.length===0){
      addMsg('bot','👋 Hi! I\'m the 479 CODE assistant. Ask me anything about our services — websites, apps, telematics, Fuel TrackPro, Smart Attendance — or get a quick quote estimate.');
    }
  });
  if(closeBtn)closeBtn.addEventListener('click',()=>box.classList.remove('open'));

  function addMsg(type,text){
    const d=document.createElement('div');
    d.className='chat-msg '+type;
    d.textContent=text;
    msgs.appendChild(d);
    msgs.scrollTop=msgs.scrollHeight;
    return d;
  }

  async function ask(q){
    history.push({role:'user',content:q});
    const typing=addMsg('bot typing','479 CODE is thinking...');
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,system:history[0].content,messages:history.slice(1)})
      });
      const data=await r.json();
      const reply=data.content?.[0]?.text||'Let me connect you with the team directly!';
      typing.remove();
      addMsg('bot',reply);
      history.push({role:'assistant',content:reply});
    }catch(e){
      typing.remove();
      addMsg('bot','Our AI is resting 😄 — chat with us directly on WhatsApp! https://wa.me/'+WA);
    }
  }

  function submit(){
    const q=input.value.trim();
    if(!q)return;
    addMsg('usr',q);
    input.value='';
    ask(q);
  }
  if(send)send.addEventListener('click',submit);
  if(input)input.addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
})();
