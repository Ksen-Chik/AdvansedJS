const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// В ДЗ переделать на промисы не используя fetch
//var getRequest = (url, callBack) => {
//  var xhr = new XMLHttpRequest();
//  xhr.open('GET', url, true);
//  xhr.onreadystatechange = () => {
//    if (xhr.readyState === 4) {
//      if (xhr.status !== 200) {
//        console.log('Error');
//      } else {
//        callBack(xhr.responseText);
//      }
//    }
//  };
//  xhr.send();
//}

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
class BagList {
  constructor(container = ".basket") {
    this.container = container;
    this._goods = []; // data
    this._allProduct = []; // массив товаров
    this._init();

    getRequest(`${API}//getBasket.json`).then((data) => {
      this._goods = JSON.parse(data);

    });
  }
  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }
}
class BagItem {
  constructor(product) {
    this.product = product;
    this.quantity = product.quantity;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd за штуку</p>
                <p class="quantity>Количество: ${this.quantity}</p>
                <p class="product-price">${this.quantity * this.price} \u20bd</p>
                <button class="buy-btn">Удалить</button>
                </div>
            </div>`
  }
}
class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = []; // data
    this._allProducts = []; // массив экземпляров товаров на основе this._goods

    getRequest(`${API}/catalogData.json`).then((data) => {
      this._goods = JSON.parse(data);
      this._render();
    });
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }

  _render() {
    const block = document.querySelector(this.container);

    for (const product of this._goods) {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

const catalog = new ProductList();
