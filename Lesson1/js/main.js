const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];
// 2. Добавила значения по умолчанию для аргументов функции (img)
// Упростить или сократить запись функций можно, убрав фигурные скобки и слово return
const renderProduct = (title, price, img = ' src="comp.jpg" alt="menu"') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <img${img}>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

// 3. Убрала запятые между продуктами с помощью метода join()
const renderProducts = (list = []) => {
    const productList = list.map((item) => renderProduct(item.title, item.price)).join('');
    // let productList = [];

    // for (let i = 0; i < list.length; i++) {
    //     productList.push(renderProduct(list[i].title, list[i].price));
    // }
    // for (const item of list) {
    //     productList.push(renderProduct(item.title, item.price));
    // }

    document.querySelector('.products').innerHTML = productList;
    // console.log(productList);
}

renderProducts(products);
