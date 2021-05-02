class BasketItem {
    constructor(dto) {
        if (dto == undefined) {
            return;
        }

        this.product = new Product(dto);
        this.quantity = dto.quantity;
    }

    render() {
        return `<div class="product-item" data-id="${this.product.id}">
                  <div class="desc">
                    <h3>${this.product.title}</h3>
                    <p>${this.product.price} \u20bd за штуку</p>
                    <p class="quantity">Количество: ${this.quantity}</p>
                    <p class="product-price">${this.quantity * this.product.price} \u20bd</p>
                    <button class="del-btn">Удалить</button>
                  </div>
              </div>`;
    }
}