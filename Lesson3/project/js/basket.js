class Basket {
    constructor(container = ".basket") {
        this.container = container;
        this.contents = [];
    }

    loadAndRender() {
        getRequest(`${API}/getBasket.json`).then((data) => {
            let basketDto = JSON.parse(data);

            this.contents = [];

            for (const basketItemDto of basketDto.contents) {
                const basketItem = new BasketItem(basketItemDto);
                this.contents.push(basketItem);
            }
            this._render();
        });
    }

    sum() {
        return this.contents.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
    }

    _render() {
        const block = document.querySelector(this.container);
        document.querySelector('.basket').innerHTML = "";
        for (const basketItem of this.contents) {
            block.insertAdjacentHTML('beforeend', basketItem.render());
        }
        const del = document.querySelectorAll('.del-btn');

        let contents = this.contents;
        del.forEach(button => button.addEventListener('click', function (event) {
            let delElement = event.target.parentNode.parentNode;
            let delId = +delElement.getAttribute('data-id');

            basket.del(contents.find(elem => delId === elem.product.id));
        }))
    }

    add(product) {
        let basketItem = this.contents.find(elem => elem.product.id === product.id);
        if (basketItem == undefined) {
            basketItem = new BasketItem();
            basketItem.product = product;
            basketItem.quantity = 1;
            this.contents.push(basketItem);
        } else {
            basketItem.quantity += 1;
        }

        this._render();
    }

    del(basketItem) {
        basketItem.quantity -= 1;
        if (basketItem.quantity < 1) {
            this.contents.splice(this.contents.indexOf(basketItem), 1);
        }
        this._render();
    }
}