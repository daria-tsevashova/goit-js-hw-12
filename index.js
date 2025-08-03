import{a as p,S as m,i as a}from"./assets/vendor-CaRFiM55.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const g="https://pixabay.com/api/",h="51587932-ec02964f1d63236ab83378a4f";function y(o){return p.get(g,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(t=>{throw console.error("Pixabay API Error:",t),t})}const c=document.querySelector(".gallery"),l=document.querySelector(".loader");let b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(o){const t=o.map(({webformatURL:i,largeImageURL:s,tags:e,likes:r,views:n,comments:u,downloads:d})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${i}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${r}</p>
        <p><b>Views:</b> ${n}</p>
        <p><b>Comments:</b> ${u}</p>
        <p><b>Downloads:</b> ${d}</p>
      </div>
    </li>`).join("");c.insertAdjacentHTML("beforeend",t),b.refresh()}function S(){c.innerHTML=""}function q(){l.classList.remove("is-hidden")}function w(){l.classList.add("is-hidden")}const f=document.querySelector(".form"),P=f.querySelector('input[name="search-text"]');f.addEventListener("submit",v);function v(o){o.preventDefault();const t=P.value.trim();if(!t){a.warning({title:"",message:"Please enter a search query.",position:"topRight",messageColor:"#fff",color:"#ef4040"});return}S(),q(),y(t).then(i=>{if(i.hits.length===0){a.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#fff",color:"#ef4040"});return}L(i.hits)}).catch(()=>{a.error({title:"",message:"Something went wrong. Try again later.",position:"topRight",messageColor:"#fff",color:"#ef4040"})}).finally(()=>{w()})}
//# sourceMappingURL=index.js.map
