class Product {
    constructor(dto, img = 'https://via.placeholder.com/200x150') {
      this.title = dto.product_name;
      this.price = dto.price;
      this.id = dto.id_product;
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