var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}var n={},a={},s=e.parcelRequired7c6;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},e.parcelRequired7c6=s),s("eWCmQ");var o=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,r=/^0o[0-7]+$/i,c=parseInt,d="object"==typeof e&&e&&e.Object===Object&&e,u="object"==typeof self&&self&&self.Object===Object&&self,p=d||u||Function("return this")(),m=Object.prototype.toString,y=Math.max,_=Math.min,f=function(){return p.Date.now()};function v(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function g(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==m.call(e)}(e))return NaN;if(v(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=v(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=l.test(e);return n||r.test(e)?c(e.slice(2),n?2:8):i.test(e)?NaN:+e}s("k3gng");var b=s("eWCmQ"),h=s("k3gng");const L=document.querySelector(".pagination__list"),S=document.querySelector(".search__form"),w=document.querySelector("input"),k=document.querySelector(".film-list"),q=document.querySelector(".infoPlace"),E=document.querySelector(".prev"),M=document.querySelector(".next");E.style.display="none";let T=1;const $=document.querySelector(".modal__img-picture"),N=document.querySelector(".modal__head"),x=document.querySelector(".modal__rating"),H=document.querySelector(".modal__votes-number"),j=document.querySelector(".modal__popularity-total"),O=document.querySelector(".modal__title-original"),R=document.querySelector(".modal__genre-description"),C=document.querySelector(".modal__text"),D=document.querySelector(".modal__button-watched"),B=document.querySelector(".modal__button-queue");let F=[],A=[];function I(e,t){let n,a="",s=t-2,o=t+2;if(L.innerHTML="",e<7)for(let s=1;s<=e;s++)n=t===s?"btn__active":"",a+=`<li class="num ${n} pagination__item"><span>${s}</span></li>`;else{t>2&&(a+='<li class="num-first pagination__item"><span>1</span></li>',t>4&&(a+='<li class="dots"><span>...</span></li>')),e>6&&(t===e&&(s-=2),t===e-1&&(s-=1),t===e-2&&(s-=1,o-=1),1===t&&(o+=2,s+=1),2===t&&(o+=1),3===t&&(o+=1,s+=1));for(let i=s;i<=o;i++)i>e||(0===i&&i++,n=t===i?"btn__active":"",a+=`<li class="num ${n} pagination__item"><span>${i}</span></li>`);t<e-1&&(t<e-3&&(a+='<li class="dots"><span>...</span></li>'),a+=`<li class="num-last pagination__item"><span>${e}</span></li>`)}L.innerHTML=a}const Q=e=>{const t=e.results,n=t.map((e=>`<div class="single-film" data-id="${e.id}" data-modal-open>\n            <img class="film-image" src="https://image.tmdb.org/t/p/w400/${e.poster_path}"\n                alt="${e.title}">\n            <div class="film-info">\n                <p class="film-title">${e.title}</p>\n                <div class="film-subinfo">\n                    <p class="film-genre">Gatunek filmowy</p>\n                    <p>${e.release_date}</p>\n                </div>\n            </div>\n        </div>`)).join("");k.innerHTML=n;document.querySelectorAll(".single-film").forEach((e=>{e.addEventListener("click",(async t=>{t.preventDefault();const n=e.dataset.id,a=await(0,h.fetchResponseDetails)(n);(async e=>{$.src=`https://image.tmdb.org/t/p/w400/${e.poster_path}`,N.innerHTML=`${e.title}`,x.innerHTML=`${e.vote_average.toFixed(1)}`,H.innerHTML=`${e.vote_count}`,j.innerHTML=`${e.popularity.toFixed(1)}`,O.innerHTML=`${e.original_title}`,R.innerHTML=`${e.genres.map((e=>e.name)).join(", ")}`,C.innerHTML=`${e.overview}`})(a),D.addEventListener("click",(()=>{D.classList.add("btn__active"),F.push({id:a.id,poster_path:a.poster_path,title:a.title,release_date:a.release_date,vote_average:a.vote_average,vote_count:a.vote_count,popularity:a.popularity,original_title:a.original_title,genres:a.genres,overview:a.overview});const e=[...new Map(F.map((e=>[e.id,e]))).values()];localStorage.setItem("Watched films",JSON.stringify(e))})),B.addEventListener("click",(()=>{B.classList.add("btn__active"),A.push({id:a.id,poster_path:a.poster_path,title:a.title,release_date:a.release_date,vote_average:a.vote_average,vote_count:a.vote_count,popularity:a.popularity,original_title:a.original_title,genres:a.genres,overview:a.overview});const e=[...new Map(A.map((e=>[e.id,e]))).values()];localStorage.setItem("Queued films",JSON.stringify(e))}))}))})),(()=>{const e={openModalBtn:document.querySelectorAll("[data-modal-open]"),closeModalBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]")};function t(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.forEach((e=>e.addEventListener("click",t))),document.addEventListener("click",(()=>{e.modal.classList.contains("is-hidden")&&(D.classList.remove("btn__active"),B.classList.remove("btn__active"))})),e.closeModalBtn.addEventListener("click",(()=>{e.modal.classList.add("is-hidden"),D.classList.remove("btn__active"),B.classList.remove("btn__active")})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&(e.modal.classList.add("is-hidden"),D.classList.remove("btn__active"),B.classList.remove("btn__active"))}))})();const a=document.querySelectorAll(".film-genre");(async()=>{const e=t.map((e=>e.genre_ids));for(let t=0;t<=a.length;t++){const n=await(0,h.getGenreNames)(e[t]);a[t].innerHTML=n}})()};D.addEventListener("click",(()=>{t(b).Notify.success("film successfully added to your watched list")})),B.addEventListener("click",(()=>{t(b).Notify.success("film successfully added to your queue list")}));const W=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})};(0,h.fetchResponseTrend)(T).then((e=>{Q(e),I(e.total_pages,T),L.addEventListener("click",(async e=>{if(!isNaN(e.target.textContent)){T=Number(e.target.textContent);const t=await(0,h.fetchResponseTrend)(T);W(),Q(t),I(t.total_pages,T),E.style.display=1==T?"none":"block",T==t.total_pages?M.style.display="none":M.style.display="block"}})),T>1&&E.addEventListener("click",(async()=>{T-=1;const e=await(0,h.fetchResponseTrend)(T);W(),Q(e),I(e.total_pages,T),1===T&&(E.style.display="none"),M.style.display="block"})),M.addEventListener("click",(async()=>{T+=1;const e=await(0,h.fetchResponseTrend)(T);W(),Q(e),I(e.total_pages,T),T===e.total_pages&&(M.style.display="none"),E.style.display="block"}))})),L.removeEventListener("submit",{}),M.removeEventListener("submit",{}),E.removeEventListener("submit",{}),S.addEventListener("submit",(e=>{let t=w.value.trim();e.preventDefault(),T=1;try{return(0,h.fetchResponseSearch)(t,T).then((e=>{0===e.total_results&&(q.innerHTML="Search result not successful. Enter the correct movie name and ",k.innerHTML="",L.innerHTML="",M.style.display="none",E.style.display="none"),e.total_results>0&&(q.innerHTML="",Q(e),I(e.total_pages,T),L.addEventListener("click",(async e=>{if(!isNaN(e.target.textContent)){T=Number(e.target.textContent);const n=await(0,h.fetchResponseSearch)(t,T);W(),Q(n),I(n.total_pages,T),E.style.display=1==T?"none":"block",T==n.total_pages?M.style.display="none":M.style.display="block"}})),T>1&&E.addEventListener("click",(async()=>{T-=1;const e=await(0,h.fetchResponseSearch)(t,T);W(),Q(e),I(e.total_pages,T),1===T&&(E.style.display="none"),M.style.display="block"})),M.addEventListener("click",(async()=>{T+=1;const e=await(0,h.fetchResponseSearch)(t,T);W(),Q(e),I(e.total_pages,T),T===e.total_pages&&(M.style.display="none"),E.style.display="block"})))}))}catch(e){console.log(e.message)}}));
//# sourceMappingURL=index.02a7baa3.js.map
