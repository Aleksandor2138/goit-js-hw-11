import Notiflix from 'notiflix';
import { SerchPhoto } from "./js/server-request";
import { cardCreat } from './js/card-img';
// import './js/top.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';




const constHtml = {
    body: document.querySelector('body'),
    form: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    more: document.querySelector('.load-more'),
    keyword: document.querySelector('.keyword'),
};
let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});
document.querySelector('html').style.cssText = `scroll-behavior: smooth;`;

// constHtml.body.insertAdjacentHTML('afterbegin', topBtnCrete);

const serchPhoto = new SerchPhoto(40);

const onSearch =async (e) => {
    e.preventDefault();
    serchPhoto.page = 1;
    serchPhoto.query = e.currentTarget.elements.searchQuery.value.trim();

    if (serchPhoto.query === '') {
        clearContent();
        constHtml.keyword.textContent = "";
        constHtml.form.reset();
        // constHtml.more.classList.add('is-hidden');
        Notiflix.Notify.failure('Please, fill out the search form');
        return;
    }
    try {
        const data = await serchPhoto.fetchPictures();
        if (data.hits.length === 0) {
            clearContent();
            constHtml.keyword.textContent = serchPhoto.query;
            constHtml.form.reset();
            constHtml.more.classList.add('is-hidden');
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        } else {
            clearContent();
            constHtml.keyword.textContent = serchPhoto.query;
            constHtml.form.reset();
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
            constHtml.gallery.insertAdjacentHTML('beforeend', cardCreat(data.hits));
            lightbox.refresh();
            // console.log(data.hits.length);
            // console.log(serchPhoto.perPage);
            if (serchPhoto.perPage <= data.hits.length ) {
                constHtml.more.classList.remove('is-hidden');
            }
        }
    } catch {
        console.log(error);
    }
    
};
constHtml.form.addEventListener('submit', onSearch)

const moreSearch = async () => {
    serchPhoto.page += 1;
    
    try {
        const data = await serchPhoto.fetchPictures();
        const totalPages = Math.ceil(data.totalHits / serchPhoto.perPage);
        constHtml.gallery.insertAdjacentHTML('beforeend', cardCreat(data.hits));
        lightbox.refresh();
        // console.log(data.hits.length);
        // console.log(serchPhoto.page);
        // console.log(totalPages);
        
        if (serchPhoto.page === totalPages) {
            constHtml.more.classList.add('is-hidden');
        }

    } catch {
        console.log(error);
    }
    
};
constHtml.more.addEventListener('click', moreSearch);


const clearContent = () => {
    constHtml.gallery.innerHTML = '';

};

const isHiden = (status) => {
    if (status) {
        constHtml.more.classList.add('is-hidden');
    }
    constHtml.more.classList.remove('is-hidden');
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('myBtn').style.display = 'block';
  } else {
    document.getElementById('myBtn').style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
topFunction();