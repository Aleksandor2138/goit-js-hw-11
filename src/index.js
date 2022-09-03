import Notiflix from 'notiflix';
import { SerchPhoto } from "./js/server-request";
import { cardCreat } from './js/card-img';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';




const constHtml = {
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

const serchPhoto = new SerchPhoto(40);

const onSearch =async (e) => {
    e.preventDefault();
    serchPhoto.page = 1;
    serchPhoto.query = e.currentTarget.elements.searchQuery.value.trim();

    if (serchPhoto.query === '') {
        clearContent();
        constHtml.keyword.textContent = "";
        constHtml.form.reset();
        constHtml.more.classList.add('is-hidden');
        Notiflix.Notify.warning('Please, fill out the search form');
        return;
    }
    try {
        const data = await serchPhoto.fetchPictures();
        if (data.hits.length === 0) {
            clearContent();
            constHtml.keyword.textContent = serchPhoto.query;
            constHtml.form.reset();
            constHtml.more.classList.add('is-hidden');
            // Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        if (data.hits.length < serchPhoto.perPage) {
            clearContent();
            constHtml.keyword.textContent = serchPhoto.query;
            constHtml.form.reset();
            constHtml.more.classList.remove('is-hidden');
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
            constHtml.gallery.insertAdjacentHTML('beforeend', cardCreat(data.hits));
            lightbox.refresh();
            return
        } 
        clearContent();
        constHtml.keyword.textContent = serchPhoto.query;
        constHtml.form.reset();
        constHtml.more.classList.remove('is-hidden');
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        constHtml.gallery.insertAdjacentHTML('beforeend', cardCreat(data.hits));
        lightbox.refresh();
        console.log(data);
    } catch {
        constHtml.keyword.textContent = serchPhoto.query;
        constHtml.form.reset();
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
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
        console.log(data.hits.length);
        console.log(serchPhoto.page);
        console.log(totalPages);
        
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




// ---------------------------------------------------------------------------------------------------

async function onFormSubmit(event) {
    event.preventDefault();
    galleryApi.page = 1;
    galleryApi.query = event.currentTarget.elements.searchQuery.value.trim();

    if (galleryApi.query === '') {
        cleanContainer();
        disableBtnLoadMore(true);
        createAlertFailure('Please fill in the search field');
        return;
    }

    try {
        const data = await galleryApi.fetchPictures();

        if (data.hits.length === 0) {
        cleanContainer();
        disableBtnLoadMore(true);
        throw 'Sorry, there are no images matching your search query. Please try again.';
        }

        if (data.hits.length < galleryApi.perPage) {
        createAlertInfo(`Hooray! We found ${data.totalHits} images.`);
        fillMarkUpAfterSubmit(data.hits);
        disableBtnLoadMore(true);
        return;
        }

        createAlertInfo(`Hooray! We found ${data.totalHits} images.`);
        fillMarkUpAfterSubmit(data.hits);
        disableBtnLoadMore(false);
    } catch (error) {
        createAlertFailure(error);
    }
}