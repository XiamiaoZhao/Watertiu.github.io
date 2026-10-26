const form=document.getElementById('login-form'),message=document.getElementById('login-message'),button=document.getElementById('login-button');
const base=new URL('.',location.href),rawFetch=window.fetch.bind(window);
let token='',expiresAt=0,api='',objectURLs=[];
const from64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function logout(){
 try{if(token)await rawFetch(api+'/api/auth/logout',{method:'POST',headers:{Authorization:'Bearer '+token},redirect:'error'});}catch{}
 token='';for(const u of objectURLs)URL.revokeObjectURL(u);location.replace(new URL(location.pathname.endsWith('admin.html')?'admin.html':'index.html',base));
}
function installAPI(){
 window.fetch=async(input,init={})=>{
  const url=new URL(typeof input==='string'||input instanceof URL?input:input.url,location.href);
  if(url.origin===new URL(api).origin&&url.pathname.startsWith(new URL(api).pathname.replace(/\/$/,'')+'/api/')){
   if(!token||Date.now()>=expiresAt)throw Error('登录已过期，请重新打开网页登录。');
   const headers=new Headers(init.headers||(input instanceof Request?input.headers:undefined));headers.set('Authorization','Bearer '+token);
   return rawFetch(input,{...init,headers,redirect:'error'});
  }
  return rawFetch(input,init);
 };
}
async function enterUI(bundle){
 const urls=new Map();
 const make=name=>{
  if(urls.has(name))return urls.get(name);if(!Object.hasOwn(bundle.modules,name))throw Error('页面文件不完整');
  let source=bundle.modules[name];
  source=source.replace(/\b(from\s*|import\s*)(['"])(\.\/[\w.-]+\.js)\2/g,(_,prefix,quote,relative)=>prefix+quote+make(relative.slice(2))+quote);
  const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));objectURLs.push(url);urls.set(name,url);return url;
 };
 const admin=location.pathname.endsWith('admin.html'),doc=new DOMParser().parseFromString(admin?bundle.admin:bundle.index,'text/html');
 doc.querySelectorAll('script').forEach(s=>s.remove());document.getElementById('login-style')?.remove();document.title=doc.title;document.body.replaceChildren(...doc.body.childNodes);
 const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('site.css',base);document.head.append(style);
 window.__XZ_BASE__=base.href;window.__XZ_API__=api;window.__XZ_LOGOUT__=logout;
 const out=document.createElement('button');out.type='button';out.textContent='退出书房';out.onclick=logout;(document.querySelector('.toplinks')||document.querySelector('main')||document.body).append(out);
 installAPI();await import(make(admin?'admin.js':'app.js'));
}
form.addEventListener('submit',async event=>{
 event.preventDefault();button.disabled=true;message.textContent='正在验证…';
 try{
  const config=await (await rawFetch(new URL('private-config.json',base),{cache:'no-store'})).json();
  const endpoint=new URL(config.apiBase);if(endpoint.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(endpoint.hostname))throw Error('服务地址尚未配置');api=endpoint.href.replace(/\/$/,'');
  const password=form.elements.password.value;
  const response=await rawFetch(api+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password}),redirect:'error',signal:AbortSignal.timeout(60000)});
  const data=await response.json();if(!response.ok)throw Error(data.error||'暂时无法登录');
  form.elements.password.value='';token=data.token;expiresAt=data.expiresAt;
  const encrypted=await (await rawFetch(new URL(config.bundle,base),{cache:'no-store'})).json();
  const key=await crypto.subtle.importKey('raw',from64(data.bundleKey),{name:'AES-GCM'},false,['decrypt']);data.bundleKey='';
  const clear=await crypto.subtle.decrypt({name:'AES-GCM',iv:from64(encrypted.iv)},key,from64(encrypted.data));
  await enterUI(JSON.parse(new TextDecoder().decode(clear)));
 }catch(error){token='';message.textContent=error.message==='Failed to fetch'?'连接暂时未成功，请稍后重试。':error.message;button.disabled=false;}
});
