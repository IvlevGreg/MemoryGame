(function () {
  const cardGame = document.querySelector('.card-game');

  //Создание формы
  function createForm() {
    const form = document.createElement('form');
    const title = document.createElement('h2');
    const button = document.createElement('button');
    const timer = document.createElement('span');
    const timerText = document.createElement('span');
    const timerRemainingTime = document.createElement('span');

    form.classList.add('form');
    title.classList.add('form__title');
    title.textContent = 'Кол-во карточек по вертикали/горизонтали';
    button.classList.add('form__button');
    button.id = 'start-button';
    button.setAttribute('type', 'button');
    button.textContent = 'Начать игру';
    timer.classList.add('timer');
    timerText.classList.add('timer__text');
    timerText.textContent = 'До конца игры осталось: ';
    timerRemainingTime.classList.add('timer__remaining-time');
    timerRemainingTime.textContent = '60';

    function createLabel(type, name, value) {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.classList.add('form__input');
      label.classList.add('form__label');
      input.setAttribute('type', type);
      input.setAttribute('name', name);
      input.setAttribute('value', value);
      label.textContent = value;
      label.prepend(input);
      return label;
    }

    cardGame.append(form);
    form.append(title);
    for (i = 2; i <= 10; i += 2) {
      form.append(createLabel('radio', '2', i));
    }
    timer.append(timerText, timerRemainingTime);
    form.append(button, timer);
  }
  createForm();

  const form = cardGame.querySelector('.form');
  const formButton = form.querySelector('.form__button');
  let timerInterval;
  //
  formButton.addEventListener('click', (e) => {
    let numberOfCards = 0;
    const formInput = form.querySelectorAll('.form__input');
    const GAME_TIME = 60000;

    // Очищаем прошлую игру
    const formButton = form.querySelector('.form__button');
    formButton.textContent = 'Новая игра';
    function cardsContainerRemove() {
      if (document.querySelector('.cards-container')) {
        document.querySelector('.cards-container').remove();
      }
    }
    cardsContainerRemove();
    let lastCheked;
    //Выбор кол-ва карточек
    formInput.forEach((e) => {
      if (e.checked) {
        lastCheked = e;
        //e.checked = false
        numberOfCards = +e.value;
        return;
      }
    });

    // Таймер
    clearInterval(timerInterval);
    const timerRemainingTime = form.querySelector('.timer__remaining-time');
    timerRemainingTime.textContent = 60;
    let divNumber = GAME_TIME / 1000;
    timerRemainingTime.textContent = divNumber;
    if (numberOfCards) {
      timerInterval = setInterval(() => {
        if (divNumber <= 0) {
          clearInterval(timerInterval);
          cardsContainerRemove();
          return;
        } else {
          divNumber -= 1;
          timerRemainingTime.textContent = divNumber;
        }
      }, 1000);

      //Создаю контейнер карточек
      function createCardsContainer() {
        const cardsContainer = document.createElement('ul');
        cardsContainer.classList.add('cards-container');
        cardsContainer.style.gridTemplateColumns =
          'repeat(' + numberOfCards + ', 1fr)';
        cardsContainer.style.gridTemplateRows =
          'repeat(' + numberOfCards + ', 1fr)';
        cardGame.append(cardsContainer);
      }
      createCardsContainer();
      const cardsContainer = document.querySelector('.cards-container');

      //Функция создания карточек
      function createCards(number, id) {
        const card = document.createElement('li');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');
        const cardNumber = document.createElement('p');
        card.id = id;

        card.classList.add('card', 'card--unsolved');
        cardFront.classList.add('card__front');
        cardBack.classList.add('card__back');
        cardNumber.classList.add('card__number');
        cardNumber.textContent = number;

        cardsContainer.append(card);
        card.append(cardFront, cardBack);
        cardBack.append(cardNumber);
      }

      //Создаем и сортируем массив
      let numbersArray = Array(numberOfCards ** 2)
        .fill()
        .map((e, i) => {
          return Math.ceil((i + 1) / 2);
        });

      for (let i = numbersArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
      }
      //Создаем карточки
      for (let i = 0; i < numbersArray.length; i++) {
        createCards(numbersArray[i], i);
      }

      // Функция переворота карточек
      function rotateCard(card) {
        card.querySelector('.card__front').classList.toggle('front--active');
        card.querySelector('.card__back').classList.toggle('back--hidden');
      }

      //Навешиваем обработчик на карточки
      function listenerUnsolvedCards() {
        const cardsUnsolved =
          cardsContainer.querySelectorAll('.card--unsolved');

        cardsUnsolved.forEach((e) => {
          e.addEventListener('click', () => {
            e.classList.toggle('card--active');
            rotateCard(e);
            checkActiveCards();
          });
        });
      }

      //Проверяем две активные карточки
      function checkActiveCards() {
        const cardsActive = cardsContainer.querySelectorAll('.card--active');
        const CLOSE_DELAY = 1000;
        let arrNumber = [];
        let arrId = [];

        cardsActive.forEach((e) => {
          arrNumber.push(e.textContent);
          arrId.push(e.id);
        });

        if (arrNumber[0] === arrNumber[1] && !(arrId[0] === arrId[1])) {
          cardsActive.forEach((e) => {
            e.classList.remove('card--active');
            e.classList.remove('card--unsolved');
            e.classList.add('card--solved');
            numbersArray.splice(-1, 2);
            if (numbersArray.length === 0) {
              clearInterval(timerInterval);
              formButton.textContent = 'Сыграть еще раз';
            }
          });
        }

        if (arrNumber.length === 2 && !(arrNumber[0] === arrNumber[1])) {
          cardsActive.forEach((e) => {
            e.classList.toggle('card--active');

            closeTimeout = setTimeout(() => {
              rotateCard(e);
            }, CLOSE_DELAY);
          });
        }
      }
      listenerUnsolvedCards();
    }
  });
})();
