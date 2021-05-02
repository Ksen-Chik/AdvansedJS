class ProductList {
  constructor(container = '.products') {
    this.container = container;

    this._allProducts = []; // каталог 
  }

  loadAndRender() {
    getRequest(`${API}/catalogData.json`).then((data) => {
      let productCatalogDto = JSON.parse(data);

      this._allProducts = [];

      for (const productDto of productCatalogDto) {
        const productObject = new Product(productDto);
        this._allProducts.push(productObject);
      }

      this._render();
    });
  }

  sum() {
    return this._allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  _render() {
    const block = document.querySelector(this.container);
    //TODO: исправить ошибку, которая возникнет если вызывать рендер более одного раза
    for (const product of this._allProducts) {
      block.insertAdjacentHTML('beforeend', product.render());
    }
    const buy = document.querySelectorAll('.buy-btn');

    let products = this._allProducts;
    buy.forEach(button => button.addEventListener('click', function (event) {
      let buyElement = event.target.parentNode.parentNode;
      let buyId = +buyElement.getAttribute('data-id');

      basket.add(products.find(elem => buyId === elem.id));
    }))

  }
}