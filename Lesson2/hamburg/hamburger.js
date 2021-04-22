class Hamburger {
  constructor(size, topping, spaice, mayonez) {
    this.size = size;
    this.topping = topping;
    this.spaice = spaice;
    this.mayonez = mayonez;
  }
  // Узнать цену
  calculatePrice() {
    let sum = 0;
    this.size === 0 ? sum += 50 : sum += 100;
    if (this.topping === 0) {
      sum += 10;
    }
    if (this.topping === 1) {
      sum += 20;
    }
    if (this.topping === 2) {
      sum += 15;
    }
    this.spaice === true ? sum += 15 : sum += 0;
    this.mayonez === true ? sum += 20 : sum += 0;
    return sum;
  }
  // Узнать калорийность
  calculateCalories() {
    let sum = 0;
    this.size === 0 ? sum += 20 : sum += 40;
    if (this.topping === 0) {
      sum += 20;
    }
    if (this.topping === 1) {
      sum += 5;
    }
    if (this.topping === 2) {
      sum += 10;
    }
    this.mayonez === true ? sum += 5 : sum += 0;
    return sum;
  }
}

size = +prompt('Выберите размер гамбургера: введите 0 - если маленький, 1 - большой');
if (size !== 0 && size !== 1) {
  size = +prompt('Некорректное значение! Выберите размер гамбургера: введите 0 - если маленький, 1 - большой');
}
topping = +prompt('Выберите начинку: введите 0 - сыр, 1 - салат, 2 - картофель');
if (topping !== 0 && topping !== 1 && topping !== 2) {
  topping = +prompt('Некорректное значение! Выберите начинку: введите 0 - сыр, 1 - салат, 2 - картофель');
}
spaice = confirm('Добавить специи?');
mayonez = confirm('Добавить майонез?');
const hamburger = new Hamburger(size, topping, spaice, mayonez);
alert(hamburger.calculatePrice());
alert(hamburger.calculateCalories());