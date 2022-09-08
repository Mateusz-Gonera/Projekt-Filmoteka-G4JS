import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchResponseTrend, fetchResponseSearch, fetchResponseDetails } from './fetchResponse';

// const s = 1;

// export { s };


const ulTag = document.querySelector('.pagination__list');


let totalPages = 20;
let page = 1;

export function changePage(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;


  if (page > 1) {
    liTag += `<li class="btn prev" onclick="changePage(totalPages, ${
      page - 1
    })"><span>&#8592</span></li>`;
  }

  if (page > 2) {
    liTag += `<li class="num" onclick="changePage(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page === totalPages) {
    beforePages = beforePages - 2;
  } else if (page === totalPages - 1) {
    beforePages = beforePages - 1;
  }

  if (page === 1) {
    afterPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength++;
    }
    if (page === pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
      liTag += `<li class="num ${activeLi}" onclick="changePage(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="num" onclick="changePage(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next" onclick="changePage(totalPages, ${
      page + 1
    })"><span>&#8594</span></li>`;
    }
    
  if (totalPages === 1) {
    liTag = `<li class="btn prev"><span>&#8592</span></li>
          <li class="num active"><span>1</span></li>
          <li class="btn next"><span>&#8594</span></li>`;
    }
    
    ulTag.innerHTML = liTag;
}

changePage(totalPages, page);
