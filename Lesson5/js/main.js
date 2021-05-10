const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    addUrl: '/addToBasket.json',
    products: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
    show: true,
    filtered: [],
    message: '',
    goods: [],
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API + this.addUrl}`)
        .then(data => {
          if (data.result === 1) {
            let productId = +product.id_product;
            let find = this.goods.find(product => product.id_product === productId);
            console.log(find);
            if (find) {
              find.quantity++;
              this._updateCart(find);
            } else {
              let product1 = {
                id_product: productId,
                price: product.price,
                product_name: product.product_name,
                quantity: 1
              };
              this.goods.push(product1);
              document.querySelector('.clearCart').textContent = '';
            }
          } else {
            alert('Error');
          }
        })
    },
    removeProduct(cart) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let productId = +cart.id_product;// element.dataset.id;
            let find = this.goods.find(product => product.id_product === productId);
            if (find.quantity > 1) {
              find.quantity--;
              this._updateCart(find);
            } else { // удаляем
              this.goods.splice(this.goods.indexOf(find), 1);
              document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
              if (this.goods.length === 0) {
                document.querySelector('.clearCart').textContent = `Ваша корзина пуста`;
              }
            }
          } else {
            alert('Error');
          }
        })
    },
    _updateCart(product) {
      let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
      block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
      block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    },
    filter() {
      let value = this.message;
      const regexp = new RegExp(value, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      this.products.forEach(el => {
        const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
        if (!this.filtered.includes(el)) {
          block.classList.add('invisible');
        } else {
          block.classList.remove('invisible');
        }
      })
    },
  },

  beforeCreate() { },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
      });

  },
  beforeMount() { },
  mounted() {
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.goods.push(el);
        }
      });
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
});
