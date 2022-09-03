const body=document.querySelector('body')

export { topBtnCrete }

// const topBtnCrete = () => {
//     const topBtn = `
//     <button class="top-btn" onclick="topFunction()"  id="myBtn" title="Go to top">
//             <svg class="top__svg">
//                 <use href="./images/icons.svg#icon-topUp"></use>
//             </svg>
//     </button>`;
//     return topBtn;
// }
// body.insertAdjacentHTML('afterbegin', topBtnCrete());

// button top   When the user scrolls down 20px from the top of the document, show the button
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