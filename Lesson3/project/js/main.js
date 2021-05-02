const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// В ДЗ переделать на промисы не используя fetch

// 1. Заменила на промис, не используя фетч
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -

const catalog = new ProductList();
catalog.loadAndRender();
const basket = new Basket();
basket.loadAndRender();

const but = document.querySelector('.btn-cart');
but.addEventListener('click', function () {
  const block = document.querySelector('.basket');
  block.classList.toggle('invisible');
});
