'use strict';

const curtCounterEl = document.querySelector('.menu_3_item span');
const basketTotalEl = document.querySelector('.basketTotal');
const curtTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это товар в корзине - объект, содержащий
 * id, название товара, цену, и количество штук, например:
 * {
 *    1: {id: 1, name: "product 1", price: 30, count: 2},
 *    3: {id: 3, name: "product 3", price: 25, count: 1},
 * }
 */
document.querySelector('.menu_3_item').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});
let curt = {};

const productEl = document.querySelector(`.con_block_cards`);
document.querySelector('.con_block_items').addEventListener('click', event => {
    if (!event.target.classList.contains('card-link')) {
        return;
    }
    let id = event.target.parentNode.parentNode.parentNode.dataset.id;
    let nameProd = event.target.parentNode.parentNode.parentNode.dataset.name;
    let priceProd = event.target.parentNode.parentNode.parentNode.dataset.price;
    let imgUrlProd = event.target.parentNode.parentNode.querySelector(`.con_block_cards_img`).attributes.src.textContent;
    addToCart(id, nameProd, priceProd);

});
function addToCart(id, nameProd, priceProd, imgUrlProd) {
    // Если такого продукта еще не было добавлено в наш объект, который хранит
    // все добавленные товары, то создаем новый объект.
    if (!(id in curt)) {
        curt[id] = { id: id, name: nameProd, price: priceProd, count: 0, img: imgUrlProd };
        curtCounterEl.classList.remove(`hidden`);
    }
    // Добавляем в количество +1 к продукту.
    curt[id].count++;
    // Ставим новое количество добавленных товаров у значка корзины.
    curtCounterEl.textContent = getTotalBasketCount().toString();
    // Ставим новую общую стоимость товаров в корзине.
    curtTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    // Отрисовываем продукт с данным id.
    renderProductInBasket(id);
}
function getTotalBasketCount() {
    return Object.values(curt).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object
        .values(curt)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(productId) {
    // Получаем строку в корзине, которая отвечает за данный продукт.
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    // Если такой строки нет, то отрисовываем новую строку.
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
    }
    // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
    // добавленных продуктах.
    const product = curt[productId];
    // Ставим новое количество в строке продукта корзины.
    basketRowEl.querySelector('.productCount').textContent = product.count;
    // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
    basketRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}
function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${curt[productId].name}
        </div>
        <div>
          <span class="productCount">${curt[productId].count}</span> шт.
        </div>
        <div>$${curt[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(curt[productId].price * curt[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}