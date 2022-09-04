const topBtn = document.getElementById('myBtn');

//  функция скрола для появления кнопки ТОР
const trackScroll=()=> {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        topBtn.classList.remove('is-hidden');
    }
    if (scrolled < coords) {
        topBtn.classList.add('is-hidden');
    }
}
window.addEventListener('scroll', trackScroll);

// функция скроля для плавного пролистывания вверх по клику по кнопке ТОР
const backToTop=()=> {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

topBtn.addEventListener('click', backToTop);