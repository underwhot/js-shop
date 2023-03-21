// COUNTERS ========================================================================================

// Код для одного счетчика =========================================
// const counterValue = document.querySelector('[data-counter]');
// const counterMinus = document.querySelector('[data-action="minus"]');
// const counterPlus = document.querySelector('[data-action="plus"]');

// console.log(counterValue.innerText);
// console.log(parseInt(counterValue.innerText));
// console.log(Number(counterValue.innerText));


// counterPlus.addEventListener('click', function() {
//   counterValue.innerText = ++counterValue.innerText;
// });
// counterMinus.addEventListener('click', function() {
//   // if (counterValue.innerText > 1) {
//   //   counterValue.innerText = --counterValue.innerText;
//   // } else {
//   //   counterValue.innerText = 1;
//   // }

//   if (parseInt(counterValue.innerText) > 1) {
//     counterValue.innerText = --counterValue.innerText;
//   }
// });


// Код для всех счетчиков =========================================

// Прослушка на все окно
window.addEventListener('click', function(e) {

  let counterValue;

  // Проверка клика строго по кнопкам
  if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
    const counterParent = e.target.closest('.counter'); // closest - вернет родителя
    counterValue = counterParent.querySelector('[data-counter]');
  }

  if (e.target.dataset.action === "plus") {
    if (parseInt(counterValue.innerText) < 99) {
      counterValue.innerText = ++counterValue.innerText;
    };
  };

  if (e.target.dataset.action === "minus") {
    if (parseInt(counterValue.innerText) > 1) {
      counterValue.innerText = --counterValue.innerText;
    } else if (e.target.closest('.basket__body') && parseInt(counterValue.innerText) === 1) {
      e.target.closest('.card').remove(); // Удаляем товар из корзины

      toggleCartStatus();
      calcCartPriceAndDelivery();
    };
  };

  // Проверка на клик + или - внутри корзины
  if (e.target.hasAttribute('data-action') && e.target.closest('.basket__cart')) {
    calcCartPriceAndDelivery();
  };
});
// COUNTERS ========================================================================================



// CART ========================================================================================
const cartWrapper = document.querySelector('.basket__cart');

window.addEventListener('click', function(e) {
  if (e.target.hasAttribute('data-cart')) {
    const cardBody = e.target.closest('.card');

    const productInfo = {
      id: cardBody.dataset.id,
      imgSrc: cardBody.querySelector('img').getAttribute('src'),
      title: cardBody.querySelector('.card__title').innerText,
      itemsInBox: cardBody.querySelector('.card__amount').innerText,
      weight: cardBody.querySelector('.card__gramm').innerText,
      price: cardBody.querySelector('.card__cost').innerText,
      counter: cardBody.querySelector('[data-counter]').innerText,
    };

    const itemInCart = cartWrapper.querySelector(`[data-id='${productInfo.id}']`);

    if (itemInCart) {
      const counterElement = itemInCart.querySelector('[data-counter]');
      counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
    } else {
      const cartItemHTML = `<div data-id='${productInfo.id}' class="cards__card card">
                              <div class="card__body">
                                <div class="card__image"><img src="${productInfo.imgSrc}" alt=""></div>
                                <div class="card__box">
                                  <h3 class="card__title">${productInfo.title}</h3>
                                  <div class="card__content">
                                    <div class="card__info">
                                      <div class="card__amount">${productInfo.itemsInBox}</div>
                                      <div class="card__gramm">${productInfo.weight}</div>
                                    </div>
                                    <div class="card__row">
                                      <div class="card__counter counter">
                                        <div class="counter__control" data-action="minus">-</div>
                                        <div class="counter__current" data-counter>${productInfo.counter}</div>
                                        <div class="counter__control" data-action="plus">+</div>
                                      </div>
                                        <div class="card__cost">${productInfo.price}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>`;
  
                            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
                          };
                          
                          cardBody.querySelector('[data-counter]').innerText = '1'; // сброс счетсчика
                          

                          toggleCartStatus();

                          calcCartPriceAndDelivery();
                          
  };
});
// CART ========================================================================================


// toggleCartStatus ============================================================================
function toggleCartStatus() {

  const cartWrapper = document.querySelector('.basket__cart');
  const cartAlert = document.querySelector('.basket__alert');
  const cartOrder = document.querySelector('.order-basket');
  
  if (cartWrapper.children.length > 0) {
    cartAlert.hidden = true;
    cartOrder.hidden = false;
  } else {
    cartAlert.hidden = false;
    cartOrder.hidden = true;
  }
  

};
// toggleCartStatus ============================================================================


// CALC CART PRICE
function calcCartPriceAndDelivery() {
  const cartWrapper = document.querySelector('.basket__cart');
  const cartItems = cartWrapper.querySelectorAll('.card');
  const deliveryCost = document.querySelector('.basket__delivery span');
  const delivery = document.querySelector('.basket__delivery');

  const totalPriceEl = document.querySelector('.basket__total span');

  let totalPrice = 0;

  cartItems.forEach(function(item) {
    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.card__cost');

    const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
    
    // totalPrice = totalPrice + currentPrice;
    totalPrice += currentPrice;
  });

  totalPriceEl.innerText = totalPrice;

  if (totalPrice > 0) {
    delivery.hidden = false;
  } else {
    delivery.hidden = true;
  }

  if (totalPrice >= 600) {
    deliveryCost.classList.add('green');
    totalPriceEl.classList.add('green-with-after');
    deliveryCost.innerText = 'бесплатно';
  } else {
    deliveryCost.classList.remove('green');
    totalPriceEl.classList.remove('green-with-after');
    deliveryCost.innerText = 250;
  }

};
// CALC CART PRICE