const express = require('express');
const fs = require('fs');
const app = express();

const status = (action, name) => {
  fs.readFile('./server/db/stats.json', 'utf-8', (err, statsString) => { // err игнорим
    if (!err) {
      const stat = JSON.parse(statsString);
      stat.push({ name, action, time: new Date() });
      fs.writeFile('./server/db/stats.json', JSON.stringify(stat), (err) => { });
    };
  });
};

/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}'); // ошибка
        } else {
          status('add', req.body.product_name);
          res.send('{"result": 1}');
        }
      })
    }
  });
});
// put полностью меняем, patch - частично
// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
  // или :id?qwe=1&rty=2
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id); // id, потому что так назвали выше
      // изменяем количество
      find.quantity += req.body.quantity;
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          status(req.body.quantity === 1 ? 'add' : 'delete', find.product_name);
          res.send('{"result": 1}');
        }
      })
    }
  });
});
app.delete('/api/cart/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id); // id, потому что так назвали выше
      cart.contents.splice(cart.contents.indexOf(find), 1);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => { // какой файл записываем, куда, что делать при ошибке
        if (err) {
          res.send('{"result": 0}');
        } else {
          status('delete', find.product_name);
          res.send('{"result": 1}');
        }
      })
    }
  });
});

/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 8888; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
