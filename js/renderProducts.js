const productsContainer = document.querySelector('#products-container');

getProducts();

async function getProducts() {
const response = await fetch('./js/products.json');

  const productsArray = await response.json();

  renderProducts(productsArray);
}

function renderProducts(productsArray) {
  productsArray.forEach(function(item) {
    const productHTML = `<div data-id='${item.id}' class="cards__card card">
                          <div class="card__body">
                            <div class="card__image"><img src="./img/${item.imgSrc}" alt=""></div>
                            <h3 class="card__title">${item.title}</h3>
                            <div class="card__content">
                              <div class="card__amount">${item.itemsInBox} шт.</div>
                              <div class="card__row">
                                <div class="card__counter counter">
                                  <div class="counter__control" data-action="minus">-</div>
                                  <div class="counter__current" data-counter>1</div>
                                  <div class="counter__control" data-action="plus">+</div>
                                </div>
                                <div class="card__info">
                                  <div class="card__gramm">${item.weight} г.</div>
                                  <div class="card__cost">${item.price}</div>
                                </div>
                              </div>
                              <button data-cart type="button" class="card__buy button">Добавить в корзину</button>
                            </div>
                          </div>
                        </div>`;

                        productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
};