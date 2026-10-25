(() => {
  'use strict';
  const g=window.CULTURE_GUIDE,$=id=>document.getElementById(id),audio=$('narration');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clock=n=>{n=Math.floor(Number(n)||0);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;};
  const tracks=[g.intro,...g.tracks],find=id=>tracks.find(t=>t.id===id);
  let selected=g.intro.id,roomId=null,rate=1,token=0,listened=new Set(),floor=0;
  try{listened=new Set(JSON.parse(localStorage.getItem('culture-'+g.id)||'[]'));}catch{}
  const sources=(list=[])=>list.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></li>`).join('');
  const roomTracks=id=>g.tracks.filter(t=>t.roomId===id);
  const activeQueue=()=>roomId?roomTracks(roomId):tracks;
  const isMuseum=g.id==='xuzhou-museum';

  function wireMap(root){
    root.querySelectorAll('[data-room],[data-track],[data-stop]').forEach(el=>{
      const action=()=>{if(el.dataset.room)openRoom(el.dataset.room);else select(el.dataset.track||el.dataset.stop,true,true);};
      el.addEventListener('click',action);
      if(el.tagName.toLowerCase()==='g')el.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();action();}});
    });
  }
  function drawMap(){
    $('room-map').innerHTML=isMuseum?window.GUIDE_MAPS.floors[floor]:window.GUIDE_MAPS.temple;
    const rooms=g.rooms.filter(r=>!floor||Number(r.floor.replace(/\D/g,''))===floor);
    $('room-list').innerHTML=isMuseum?rooms.map(r=>'<button data-room="'+esc(r.id)+'"><b>'+esc(r.floor)+'</b><span>'+esc(r.name)+'<small>'+roomTracks(r.id).filter(t=>!t.isOverview).length+' 个重点看点</small></span><span>↗</span></button>').join(''):g.tracks.map((t,i)=>'<button data-stop="'+esc(t.id)+'"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+esc(t.title)+'<small>'+clock(t.duration)+' · 点击听讲解</small></span><span>↗</span></button>').join('');
    wireMap($('room-map'));wireMap($('room-list'));
    document.querySelectorAll('[data-floor]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.floor)===floor)));
    $('map-viewport').scrollTo({left:0,top:0});setZoom('room-map',1);
  }
  function writeHash(){const p=new URLSearchParams();if(floor)p.set('floor',floor);if(roomId)p.set('room',roomId);if(selected!==g.intro.id)p.set('stop',selected);history.replaceState(null,'',location.pathname+location.search+(p.size?'#'+p:''));}
  function openRoom(id,move=true){
    const r=g.rooms.find(r=>r.id===id);if(!r||!isMuseum)return;audio.pause();$('player-shell').hidden=true;roomId=id;selected=g.intro.id;
    $('map-section').hidden=true;$('room-section').hidden=false;$('detail-section').hidden=true;
    $('room-title').textContent=r.name;$('room-summary').textContent=r.summary;$('room-tag').textContent=r.floor+' / '+r.location;
    $('room-art-map').innerHTML=window.GUIDE_MAPS.rooms[id];wireMap($('room-art-map'));setZoom('room-art-map',1);
    $('room-locator').innerHTML=window.GUIDE_MAPS.locators[id];wireMap($('room-locator'));
    const overview=roomTracks(id).find(t=>t.isOverview);$('listen-room').dataset.track=overview.id;$('room-duration').textContent=clock(overview.duration);
    $('objects').innerHTML=roomTracks(id).filter(t=>!t.isOverview).map((t,i)=>'<button class="object-row" data-track="'+esc(t.id)+'" aria-pressed="false"><b>'+String(i+1).padStart(2,'0')+'</b><span><strong>'+esc(t.title)+'</strong><small>'+esc(t.summary)+'</small></span><em>'+clock(t.duration)+' ▶</em></button>').join('');wireMap($('objects'));writeHash();
    if(move)$('room-section').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function backToMap(){audio.pause();$('player-shell').hidden=true;roomId=null;selected=g.intro.id;$('map-section').hidden=false;$('room-section').hidden=true;$('detail-section').hidden=true;drawMap();writeHash();$('map-section').scrollIntoView({behavior:'smooth',block:'start'});}
  function setZoom(id,z){const el=$(id);el.dataset.zoom=z;el.style.width=(z*100)+'%';const label=document.querySelector('[data-zoom-label="'+id+'"]');if(label)label.textContent=Math.round(z*100)+'%';}
  function showPhoto(t){const el=$('object-photo');if(t.photo){el.hidden=false;el.innerHTML=`<img src="${esc(t.photo.src)}" alt="${esc(t.photo.alt||t.title)}"><figcaption>${esc(t.photo.caption||t.title)}<br>${esc(t.photo.author||t.photo.artist||'')} · ${t.photo.licenseURL?`<a href="${esc(t.photo.licenseURL)}" target="_blank" rel="noopener">${esc(t.photo.license)}</a>`:esc(t.photo.license||'')} · <a href="${esc(t.photo.source)}" target="_blank" rel="noopener">原始照片 ↗</a></figcaption>`;}else{el.hidden=true;el.innerHTML='';}}
  function select(id,play=false,move=false){const t=find(id);if(!t)return;token++;audio.pause();selected=id;audio.src=t.audio;audio.playbackRate=rate;if(play)$('player-shell').hidden=false;
    $('detail-title').textContent=t.title;$('detail-summary').textContent=t.summary;$('detail-label').textContent=t.period||t.eyebrow||(t.id===g.intro.id?'历史开篇':'重点讲解');showPhoto(t);
    $('facts').innerHTML=[['历史',t.history],['工艺',t.craft],['地位',t.significance]].filter(x=>x[1]).map(([k,v])=>`<div><h3>${k}</h3><p>${esc(v)}</p></div>`).join('');
    $('script-text').innerHTML=t.narration.split(/\n+/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');$('track-sources').innerHTML=sources(t.sources);$('full-text').open=false;
    $('detail-section').hidden=false;$('player-title').textContent=t.title;$('player-meta').textContent=clock(t.duration)+' · AI 中文女声';$('subtitle').textContent=t.summary;
    document.querySelectorAll('[data-track]').forEach(el=>{const on=el.dataset.track===id;el.classList.toggle('selected',on);el.setAttribute('aria-pressed',String(on));});
    const q=activeQueue(),index=q.findIndex(x=>x.id===id);$('previous').disabled=index<=0;$('next').disabled=index<0||index===q.length-1;
    if('mediaSession'in navigator&&'MediaMetadata'in window)navigator.mediaSession.metadata=new MediaMetadata({title:t.title,artist:'行！整！· AI 语音导览',album:g.title});
    writeHash();renderPlaying();document.querySelectorAll('[data-stop]').forEach(el=>el.classList.toggle('selected',el.dataset.stop===id));if(play)start();if(move)$('detail-section').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function renderPlaying(){const playing=!audio.paused&&!audio.ended;$('listen').textContent=playing?'暂停讲解':'▶ 听这段讲解';$('listen').setAttribute('aria-pressed',String(playing));}
  async function start(){$('player-shell').hidden=false;const request=++token;try{if(audio.error){audio.load();audio.playbackRate=rate;}await audio.play();$('audio-status').textContent='';}catch(e){if(request===token&&e.name!=='AbortError')$('audio-status').textContent='暂时无法播放，请检查网络后再点播放。';}}
  function step(direction){const q=activeQueue(),i=q.findIndex(t=>t.id===selected),t=q[i+direction];if(t)select(t.id,true,false);}
  function seek(seconds){if(Number.isFinite(audio.duration))audio.currentTime=Math.max(0,Math.min(audio.duration,audio.currentTime+seconds));}
  $('listen').addEventListener('click',()=>audio.paused?start():audio.pause());
  $('listen-intro').addEventListener('click',()=>{roomId=null;select(g.intro.id,true,true);});
  $('back-map').addEventListener('click',backToMap);
  $('nav-map').addEventListener('click',e=>{e.preventDefault();backToMap();});
  $('listen-room').addEventListener('click',e=>select(e.currentTarget.dataset.track,true,true));
  $('close-player').addEventListener('click',()=>{audio.pause();$('player-shell').hidden=true;});
  document.querySelectorAll('[data-floor]').forEach(el=>el.addEventListener('click',()=>{floor=Number(el.dataset.floor);drawMap();writeHash();}));
  document.querySelectorAll('[data-zoom]').forEach(el=>el.addEventListener('click',()=>{const id=el.dataset.for,z=Number($(id).dataset.zoom)||1;setZoom(id,el.dataset.zoom==='reset'?1:Math.max(1,Math.min(3,z+Number(el.dataset.zoom))));}));
  $('previous').addEventListener('click',()=>step(-1));$('next').addEventListener('click',()=>step(1));$('rewind').addEventListener('click',()=>seek(-15));$('forward').addEventListener('click',()=>seek(15));
  $('speed').addEventListener('click',()=>{const speeds=[.8,1,1.25,1.5];rate=speeds[(speeds.indexOf(rate)+1)%speeds.length];audio.playbackRate=rate;$('speed').textContent=rate+'×';$('speed').setAttribute('aria-label','播放速度 '+rate+' 倍');});
  audio.addEventListener('play',renderPlaying);audio.addEventListener('pause',renderPlaying);
  audio.addEventListener('timeupdate',()=>{const t=find(selected),cue=(t.cues||[]).find(c=>audio.currentTime>=c.start&&audio.currentTime<c.end);$('subtitle').textContent=cue?.text||t.summary;if(audio.currentTime>(t.duration*.92)){listened.add(t.id);try{localStorage.setItem('culture-'+g.id,JSON.stringify([...listened]));}catch{}$('listened').textContent=`已听 ${listened.size} / ${tracks.length}`;}});
  audio.addEventListener('ended',()=>{renderPlaying();if($('continuous').checked)step(1);});
  audio.addEventListener('error',()=>{$('audio-status').textContent='音频加载失败，可展开完整讲稿或重新点击播放。';});
  if('mediaSession'in navigator)for(const [k,v] of Object.entries({play:start,pause:()=>audio.pause(),seekbackward:()=>seek(-15),seekforward:()=>seek(15),previoustrack:()=>step(-1),nexttrack:()=>step(1)}))try{navigator.mediaSession.setActionHandler(k,v);}catch{}
  const initial=new URLSearchParams(location.hash.slice(1));floor=[0,1,2,3].includes(Number(initial.get('floor')))?Number(initial.get('floor')):0;drawMap();$('listened').textContent=`已听 ${listened.size} / ${tracks.length}`;
  const query=new URLSearchParams(location.hash.slice(1)),wanted=find(query.get('stop'));
  if(wanted?.roomId&&isMuseum){openRoom(wanted.roomId,false);select(wanted.id);}else if(isMuseum&&g.rooms.some(r=>r.id===query.get('room')))openRoom(query.get('room'),false);else if(wanted)select(wanted.id);else $('detail-section').hidden=true;
})();
