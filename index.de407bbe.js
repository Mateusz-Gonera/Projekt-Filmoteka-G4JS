var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}var n={},o={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},e.parcelRequired7c6=a),a("eWCmQ");var s=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,r=/^0o[0-7]+$/i,c=parseInt,d="object"==typeof e&&e&&e.Object===Object&&e,u="object"==typeof self&&self&&self.Object===Object&&self,p=d||u||Function("return this")(),m=Object.prototype.toString,y=Math.max,f=Math.min,_=function(){return p.Date.now()};function v(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function g(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==m.call(e)}(e))return NaN;if(v(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=v(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(s,"");var n=l.test(e);return n||r.test(e)?c(e.slice(2),n?2:8):i.test(e)?NaN:+e}a("k3gng");var h=a("eWCmQ"),L=a("k3gng");const b=document.querySelector(".pagination__list"),S=document.querySelector(".search__form"),M=document.querySelector("input"),w=document.querySelector(".film-list"),T=document.querySelector(".infoPlace"),k=document.querySelector(".prev"),q=document.querySelector(".next");k.style.display="none";let E=1;const H=document.querySelector(".modal__img-picture"),$=document.querySelector(".modal__head"),N=document.querySelector(".modal__rating"),x=document.querySelector(".modal__votes-number"),j=document.querySelector(".modal__popularity-total"),O=document.querySelector(".modal__title-original"),R=document.querySelector(".modal__genre-description"),C=document.querySelector(".modal__text"),D=document.querySelector(".modal__button-watched"),B=document.querySelector(".modal__button-queue"),F=document.querySelector(".backdrop");let A=[],I=[];function Q(e,t){let n,o="",a=t-2,s=t+2;if(b.innerHTML="",e<7)for(let a=1;a<=e;a++)n=t===a?"btn__active":"",o+=`<li class="num ${n} pagination__item"><span>${a}</span></li>`;else{t>2&&(o+='<li class="num-first pagination__item"><span>1</span></li>',t>4&&(o+='<li class="dots"><span>...</span></li>')),e>6&&(t===e&&(a-=2),t===e-1&&(a-=1),t===e-2&&(a-=1,s-=1),1===t&&(s+=2,a+=1),2===t&&(s+=1),3===t&&(s+=1,a+=1));for(let i=a;i<=s;i++)i>e||(0===i&&i++,n=t===i?"btn__active":"",o+=`<li class="num ${n} pagination__item"><span>${i}</span></li>`);t<e-1&&(t<e-3&&(o+='<li class="dots"><span>...</span></li>'),o+=`<li class="num-last pagination__item"><span>${e}</span></li>`)}b.innerHTML=o}const W=e=>{const t=e.results,n=t.map((e=>`<div class="single-film" data-id="${e.id}" data-modal-open>\n            <img class="film-image" src="https://image.tmdb.org/t/p/w400/${e.poster_path}"\n                alt="${e.title}">\n            <div class="film-info">\n                <p class="film-title">${e.title}</p>\n                <div class="film-subinfo">\n                    <p class="film-genre">Gatunek filmowy</p>\n                    <p class="film-year">| ${e.release_date.slice(0,4)}</p>\n                </div>\n            </div>\n        </div>`)).join("");w.innerHTML=n;document.querySelectorAll(".single-film").forEach((e=>{e.addEventListener("click",(async t=>{H.src="",$.innerHTML="",N.innerHTML="",x.innerHTML="",j.innerHTML="",O.innerHTML="",R.innerHTML="",C.innerHTML="",t.preventDefault();const n=e.dataset.id,o=await(0,L.fetchResponseDetails)(n);(async e=>{H.src=`https://image.tmdb.org/t/p/w400/${e.poster_path}`,$.innerHTML=`${e.title}`,N.innerHTML=`${e.vote_average.toFixed(1)}`,x.innerHTML=`${e.vote_count}`,j.innerHTML=`${e.popularity.toFixed(1)}`,O.innerHTML=`${e.original_title}`,R.innerHTML=`${e.genres.map((e=>e.name)).join(", ")}`,C.innerHTML=`${e.overview}`})(o),D.addEventListener("click",(()=>{F.classList.add("is-hidden"),A.push({id:o.id,poster_path:o.poster_path,title:o.title,release_date:o.release_date,vote_average:o.vote_average,vote_count:o.vote_count,popularity:o.popularity,original_title:o.original_title,genres:o.genres,overview:o.overview});const e=[...new Map(A.map((e=>[e.id,e]))).values()];localStorage.setItem("Watched films",JSON.stringify(e))})),B.addEventListener("click",(()=>{F.classList.add("is-hidden"),I.push({id:o.id,poster_path:o.poster_path,title:o.title,release_date:o.release_date,vote_average:o.vote_average,vote_count:o.vote_count,popularity:o.popularity,original_title:o.original_title,genres:o.genres,overview:o.overview});const e=[...new Map(I.map((e=>[e.id,e]))).values()];localStorage.setItem("Queued films",JSON.stringify(e))}))}))})),(()=>{const e={openModalBtn:document.querySelectorAll("[data-modal-open]"),closeModalBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]")};function t(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.forEach((e=>e.addEventListener("click",t))),e.closeModalBtn.addEventListener("click",(()=>{e.modal.classList.add("is-hidden")})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.modal.classList.add("is-hidden")}))})();const o=document.querySelectorAll(".film-genre");(async()=>{const e=t.map((e=>e.genre_ids));for(let t=0;t<=o.length;t++){const n=await(0,L.getGenreNames)(e[t]);o[t].innerHTML=n}})()};D.addEventListener("click",(()=>{t(h).Notify.success("film successfully added to your watched list")})),B.addEventListener("click",(()=>{t(h).Notify.success("film successfully added to your queue list")}));const G=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})};(0,L.fetchResponseTrend)(E).then((e=>{W(e),Q(e.total_pages,E),b.addEventListener("click",(async e=>{if(!isNaN(e.target.textContent)){E=Number(e.target.textContent);const t=await(0,L.fetchResponseTrend)(E);G(),W(t),Q(t.total_pages,E),k.style.display=1==E?"none":"block",E==t.total_pages?q.style.display="none":q.style.display="block"}})),E>1&&k.addEventListener("click",(async()=>{E-=1;const e=await(0,L.fetchResponseTrend)(E);G(),W(e),Q(e.total_pages,E),1===E&&(k.style.display="none"),q.style.display="block"})),q.addEventListener("click",(async()=>{E+=1;const e=await(0,L.fetchResponseTrend)(E);G(),W(e),Q(e.total_pages,E),E===e.total_pages&&(q.style.display="none"),k.style.display="block"}))})),b.removeEventListener("submit",{}),q.removeEventListener("submit",{}),k.removeEventListener("submit",{}),S.addEventListener("submit",(e=>{let t=M.value.trim();e.preventDefault(),E=1;try{return(0,L.fetchResponseSearch)(t,E).then((e=>{0===e.total_results&&(T.innerHTML="Search result not successful. Enter the correct movie name and ",w.innerHTML="",b.innerHTML="",q.style.display="none",k.style.display="none"),e.total_results>0&&(T.innerHTML="",W(e),Q(e.total_pages,E),b.addEventListener("click",(async e=>{if(!isNaN(e.target.textContent)){E=Number(e.target.textContent);const n=await(0,L.fetchResponseSearch)(t,E);G(),W(n),Q(n.total_pages,E),k.style.display=1==E?"none":"block",E==n.total_pages?q.style.display="none":q.style.display="block"}})),E>1&&k.addEventListener("click",(async()=>{E-=1;const e=await(0,L.fetchResponseSearch)(t,E);G(),W(e),Q(e.total_pages,E),1===E&&(k.style.display="none"),q.style.display="block"})),q.addEventListener("click",(async()=>{E+=1;const e=await(0,L.fetchResponseSearch)(t,E);G(),W(e),Q(e.total_pages,E),E===e.total_pages&&(q.style.display="none"),k.style.display="block"})))}))}catch(e){console.log(e.message)}}));
//# sourceMappingURL=index.de407bbe.js.map