const intro=document.querySelector('#intro');const main=document.querySelector('#main');const open=document.querySelector('#open');const surprise=document.querySelector('#surprise');const lockedCountdown=document.querySelector('#lockedCountdown');const countdown=document.querySelector('#countdown');
function getTarget(){const now=new Date();let y=now.getFullYear();return new Date(y,8,20,0,0,0);}
function updateCountdown(){const now=new Date(),t=getTarget(),sameDay=now.getMonth()===8&&now.getDate()===20,d=Math.max(0,t-now),days=Math.floor(d/86400000),hours=Math.floor(d/3600000)%24,mins=Math.floor(d/60000)%60,secs=Math.floor(d/1000)%60;if(sameDay){lockedCountdown.textContent='Today is your day. ❤️';countdown.textContent='It’s your birthday, Babi. Let the celebration begin. ✨';document.querySelector('.locked-note').innerHTML='Happy Birthday, <strong>Babi</strong> ❤️';}else{lockedCountdown.textContent=days+'d '+hours+'h '+mins+'m '+secs+'s';countdown.textContent=days+' days • '+hours+' hours • '+mins+' minutes • '+secs+' seconds until your birthday';}}
/* Cinematic opening */
intro.classList.remove('gone');
main.classList.add('dimmed');
setTimeout(function(){intro.classList.add('cinematic-ready');},120);
setTimeout(function(){intro.classList.add('cinematic-finish');},4300);
setTimeout(function(){intro.classList.add('gone');main.classList.remove('dimmed');main.classList.add('ready');},5200);
updateCountdown();setInterval(updateCountdown,1000);

/* Automatic birthday-night mode: activates on September 20 and stays subtle elsewhere. */
const midnightBadge=document.querySelector('#midnightBadge');
function updateMidnightMode(){
  const now=new Date();
  const isBirthday=now.getMonth()===8&&now.getDate()===20;
  const isNight=isBirthday&&(now.getHours()>=20||now.getHours()<6);
  document.body.classList.toggle('midnight-mode',isNight);
  if(midnightBadge) midnightBadge.classList.toggle('hidden',!isNight);
}
updateMidnightMode();
setInterval(updateMidnightMode,30000);
open.addEventListener('click',function(){surprise.classList.remove('hidden');surprise.scrollIntoView({behavior:'smooth',block:'start'});});
let q=0;document.querySelectorAll('.question button').forEach(function(btn){btn.addEventListener('click',function(){const qs=document.querySelectorAll('.question');if(btn.dataset.answer==='right')q++;qs.forEach(x=>x.classList.remove('active'));if(q<qs.length)qs[q].classList.add('active');else document.querySelector('.quiz-result').classList.remove('hidden');});});
const letterBtn=document.querySelector('#letterBtn'),modal=document.querySelector('#loveModal');letterBtn.addEventListener('click',function(){modal.classList.remove('hidden');document.querySelectorAll('.love-popup').forEach(x=>x.classList.add('hidden'));document.querySelector('#lovePopup1').classList.remove('hidden');});document.querySelector('#loveClose').addEventListener('click',function(){modal.classList.add('hidden');});
const openEnvelope=document.querySelector('#openEnvelope'),envelope=document.querySelector('#envelope');
openEnvelope.addEventListener('click',function(){envelope.classList.toggle('opened');const opened=envelope.classList.contains('opened');letterOpened=opened;openEnvelope.textContent=opened?'Close my letter 💗':'Open my letter 💌';if(opened){burstAt(window.innerWidth*.5,window.innerHeight*.55,18);enterBirthdayMode();}});document.querySelector('.love-modal-backdrop').addEventListener('click',function(){modal.classList.add('hidden');});document.querySelectorAll('.popup-next').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.love-popup').forEach(x=>x.classList.add('hidden'));document.querySelector('#lovePopup'+btn.dataset.next).classList.remove('hidden');});});
document.querySelector('#wish').addEventListener('click',function(e){if(!letterOpened||!cakeWished){e.target.animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'none'}],{duration:260});const note=document.querySelector('#message');note.classList.remove('hidden');note.innerHTML='Open the letter and make your cake wish first. ❤️';return;}finalWished=true;document.querySelector('#message').classList.remove('hidden');document.querySelector('#secretGate').classList.remove('hidden');e.target.textContent='Wish sent into the universe ✨';e.target.disabled=true;wishBurst();burstAt(window.innerWidth*.5,window.innerHeight*.45,24);enterBirthdayMode();});const secretGate=document.querySelector('#secretGate'),unlockSecret=document.querySelector('#unlockSecret'),secretMessage=document.querySelector('#secretMessage');unlockSecret.addEventListener('click',function(){if(!finalWished)return;secretGate.classList.add('hidden');secretMessage.classList.remove('hidden');musicMood='final';secretMessage.animate([{opacity:0,transform:'translateY(25px) scale(.96)'},{opacity:1,transform:'none'}],{duration:1100,easing:'cubic-bezier(.22,1,.36,1)'});burstAt(window.innerWidth*.5,window.innerHeight*.45,34);setTimeout(function(){exitBirthdayMode();endingScene.classList.remove('hidden');endingScene.classList.add('show');endingScene.setAttribute('aria-hidden','false');},2600);});const blowCandles=document.querySelector('#blowCandles');const cake=document.querySelector('#birthdayCake');const cakeMessage=document.querySelector('#cakeMessage');const cakeHint=document.querySelector('#cakeHint');blowCandles.addEventListener('click',function(){cakeWished=true;musicMood='wish';cake.classList.add('blown');blowCandles.textContent='Wish made ❤️';blowCandles.disabled=true;cakeHint.textContent='Your wish has been sent into the universe. ✨';cakeMessage.classList.remove('hidden');setTimeout(function(){const magic=document.querySelector('#magicMoment');if(magic){magic.classList.remove('hidden');magic.animate([{opacity:0,transform:'translateY(18px) scale(.96)'},{opacity:1,transform:'none'}],{duration:900,easing:'cubic-bezier(.22,1,.36,1)'});burstAt(window.innerWidth*.5,window.innerHeight*.48,22);}},850);});
const musicToggle=document.querySelector('#musicToggle');const birthdayMode=document.querySelector('#birthdayMode');const endingScene=document.querySelector('#endingScene');let audioCtx=null,musicTimer=null,musicOn=false;let musicMood='hero';let letterOpened=false,cakeWished=false,finalWished=false;
const birthdayNotes=[['G4',.28],['G4',.28],['A4',.55],['G4',.55],['C5',.55],['B4',1.0],['G4',.28],['G4',.28],['A4',.55],['G4',.55],['D5',.55],['C5',1.0],['G4',.28],['G4',.28],['G5',.55],['E5',.55],['C5',.55],['B4',.55],['A4',.9],['F5',.28],['F5',.28],['E5',.55],['C5',.55],['D5',.55],['C5',1.0]];
const freq={C5:523.25,D5:587.33,E5:659.25,F5:698.46,G4:392,G5:783.99,A4:440,B4:493.88};
function playBirthdayMusic(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();audioCtx.resume();const mood={hero:[.10,1],love:[.075,.94],dreams:[.065,.9],wish:[.13,1.05],letter:[.055,.84],final:[.085,.92]}[musicMood]||[.1,1];let t=audioCtx.currentTime+.05;birthdayNotes.forEach(([n,d])=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=freq[n]*mood[1];const dur=d*(.9+(mood[0]/.1)*.1);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(mood[0],t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+dur-.03);o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+dur);t+=dur+.035;});return t-audioCtx.currentTime;}
function startMusic(){if(musicOn)return;musicOn=true;musicToggle.textContent='🔊 Birthday Music On';const loop=()=>{if(!musicOn)return;const dur=playBirthdayMusic();musicTimer=setTimeout(loop,(dur*1000)+250);};loop();}
function stopMusic(){musicOn=false;clearTimeout(musicTimer);musicToggle.textContent='🎵 Play Birthday Music';}
musicToggle.addEventListener('click',function(){if(musicOn)stopMusic();else startMusic();});
document.addEventListener('click',function(){if(!musicOn)startMusic();},{once:true});

/* Scroll reveals + soft romantic floating hearts */
document.querySelectorAll('.section,.card,.final').forEach(function(el,index){el.classList.add('reveal');if(index<4)el.classList.add('reveal-delay-'+Math.min(index+1,4));});
const revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});},{threshold:.14});

/* Continuous-scroll scene tracking — no slide navigation or snap behavior */
const sceneItems=[
  {el:document.querySelector('.hero'),label:'hero'},
  {el:document.querySelector('#surprise'),label:'love'},
  {el:document.querySelector('.dreams'),label:'dreams'},
  {el:document.querySelector('.cake-section'),label:'wish'},
  {el:document.querySelector('.letter'),label:'letter'},
  {el:document.querySelector('.final'),label:'final'}
].filter(function(item){return item.el;});
const sceneObserver=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting)return;
    musicMood=entry.target===document.querySelector('#surprise')?'love':
      entry.target.classList.contains('dreams')?'dreams':
      entry.target.classList.contains('cake-section')?'wish':
      entry.target.classList.contains('letter')?'letter':
      entry.target.classList.contains('final')?'final':'hero';
    document.body.dataset.scene=musicMood;
    entry.target.classList.add('scene-active');
    setTimeout(function(){entry.target.classList.remove('scene-active');},1200);
  });
},{threshold:.25});
sceneItems.forEach(function(item){sceneObserver.observe(item.el);});

document.addEventListener('pointerdown',function(e){const b=e.target.closest('button');if(!b)return;const r=b.getBoundingClientRect();const s=document.createElement('span');s.className='click-ripple';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';b.appendChild(s);setTimeout(()=>s.remove(),650);},{passive:true});
function createPetal(){const p=document.createElement('span');p.className='romantic-petal';p.textContent=Math.random()>.5?'♡':'✦';p.style.left=(Math.random()*100)+'vw';p.style.setProperty('--petal-drift',((Math.random()*160)-80)+'px');p.style.setProperty('--petal-duration',(6+Math.random()*6)+'s');document.body.appendChild(p);setTimeout(function(){p.remove();},13000);}setInterval(function(){if(!document.hidden)createPetal();},900);for(let i=0;i<5;i++)setTimeout(createPetal,i*350);
function floatingHeart(x,y){const h=document.createElement('span');h.className='heart-particle';h.textContent=['♡','♥','❤','✦'][Math.floor(Math.random()*4)];h.style.setProperty('--x',x+'px');h.style.setProperty('--y',y+'px');h.style.setProperty('--drift',((Math.random()*90)-45)+'px');h.style.setProperty('--dur',(1.8+Math.random()*1.4)+'s');h.style.left='0';h.style.top='0';document.body.appendChild(h);setTimeout(function(){h.remove();},3400);}
function wishBurst(){const b=document.createElement('div');b.className='wish-burst';b.textContent='✨  ♡  ✨';document.body.appendChild(b);setTimeout(function(){b.remove();},1300);for(let i=0;i<9;i++){setTimeout(function(){floatingHeart(window.innerWidth*(.25+Math.random()*.5),window.innerHeight*(.55+Math.random()*.12));},i*55);}}
blowCandles.addEventListener('click',function(){wishBurst();});

/* Cinematic interaction effects */
function burstAt(x,y,count){
  for(let i=0;i<count;i++){
    setTimeout(function(){
      floatingHeart(x+(Math.random()*80-40),y+(Math.random()*50-25));
    },i*35);
  }
}
document.querySelectorAll('button').forEach(function(btn){
  btn.addEventListener('click',function(e){
    if(btn.id==='musicToggle')return;
    const r=btn.getBoundingClientRect();
    burstAt(r.left+r.width/2,r.top+r.height/2,5);
  });
});
const modalObserver=new MutationObserver(function(){
  const card=document.querySelector('.love-modal-card');
  if(card&&!modal.classList.contains('hidden')){
    card.animate([{transform:'scale(.94) translateY(25px)',opacity:0},{transform:'scale(1) translateY(0)',opacity:1}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});
  }
});
modalObserver.observe(modal,{attributes:true,attributeFilter:['class']});
let lastSlide=-1;
slideItems.forEach(function(item,index){
  item.el.addEventListener('scrollend',function(){
    if(index!==lastSlide){
      lastSlide=index;
      burstAt(window.innerWidth*.5,window.innerHeight*.72,7);
    }
  });
});