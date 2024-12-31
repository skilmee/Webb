import { basket } from "./displayDishes.js";

// Функция для показа уведомления
function showNotification(message) {
  const notification = document.getElementById("notification");
  const messageElem = document.getElementById("notification-message");
  
  messageElem.textContent = message;
  
  notification.classList.remove("hidden");
}

// Обработчик нажатия на кнопку "Окей"
document.getElementById("notification-ok").addEventListener("click", () => {
  const notification = document.getElementById("notification");
  
  notification.classList.add("hidden");
});

// Функция для проверки заказа
function checkOrder() {
  // Получаем текущий набор блюд из корзины
  const selectedDishes = {
    soup: basket.soup.name !== "",
<<<<<<< HEAD
    "main-course": basket["main-course"].name !== "",
    salad: basket.salad.name !== "",
    drink: basket.drink.name !== "",
    dessert: basket.dessert.name !== ""
  };

    if (
      !selectedDishes.soup &&
      !selectedDishes["main-course"] &&
      !selectedDishes.salad &&
      !selectedDishes.drink &&
      !selectedDishes.dessert
    ) {
      return "Ничего не выбрано. Выберите блюда для заказа";
    }
  
    // Если выбраны все необходимые блюда, кроме напитка
    if (
      selectedDishes.soup &&
      (selectedDishes["main-course"] || selectedDishes.salad) &&
      !selectedDishes.drink
    ) {
      return "Выберите напиток";
    }

    if (!selectedDishes.drink) {
      return "Выберите напиток";
=======
    main_dish: basket.main_dish.name !== "",
    salad_starter: basket.salad_starter.name !== "",
    juice: basket.juice.name !== "",
    dessert: basket.dessert.name !== ""
  };

 // Логика проверки на соответствие одному из вариантов ланча
 if (!selectedDishes.soup && !selectedDishes.main_dish && !selectedDishes.salad_starter && !selectedDishes.juice && !selectedDishes.dessert) {
    return "Ничего не выбрано. Выберите блюда для заказа";
  }
  if (selectedDishes.dessert && !selectedDishes.soup && !selectedDishes.main_dish && !selectedDishes.salad_starter && !selectedDishes.juice) {
    return "Только десерт заказать нельзя. Выберите другие блюда.";
  }
  if (!selectedDishes.juice) {
    return "Выберите напиток";
  }
  if (selectedDishes.soup && !selectedDishes.main_dish && !selectedDishes.salad_starter) {
    return "Выберите главное блюдо/салат/стартер";
  }
  if (selectedDishes.salad_starter && (!selectedDishes.soup || !selectedDishes.main_dish)) {
    return "Выберите суп или главное блюдо";
  }
  if (!selectedDishes.main_dish) {
    return "Выберите главное блюдо";
>>>>>>> parent of c31a3a2 (Update notifications.js)
  }
  
    // Если выбран суп, но не выбраны главное блюдо или салат
    if (selectedDishes.soup && !selectedDishes["main-course"] && !selectedDishes.salad) {
      return "Выберите главное блюдо или салат";
    }
  
    // Если выбран салат, но не выбраны суп или главное блюдо
    if (selectedDishes.salad && !selectedDishes.soup && !selectedDishes["main-course"]) {
      return "Выберите суп или главное блюдо";
    }
  
    // Если выбран только напиток или десерт (без других обязательных блюд)
    if (
      (selectedDishes.drink || selectedDishes.dessert) &&
      !selectedDishes.soup &&
      !selectedDishes["main-course"] &&
      !selectedDishes.salad
    ) {
      return "Выберите главное блюдо";
    }
  
    // Если все условия выполнены, уведомление отсутствует
    return null;
  }
  

<<<<<<< HEAD
// Обработчик отправки формы
document.querySelector("form").addEventListener("submit", (event) => {
  const errorMessage = checkOrder();
  
  if (errorMessage) {
    event.preventDefault(); // Отменяем отправку формы
    showNotification(errorMessage); // Показываем уведомление
  }
});


=======
  // Если все условия соблюдены, возвращаем null
  return null;
}



// Обработчик отправки формы
document.querySelector("form").addEventListener("submit", (event) => {
  const errorMessage = checkOrder();
  
  if (errorMessage) {
    event.preventDefault(); // Отменяем отправку формы
    showNotification(errorMessage); // Показываем уведомление
  }
});

>>>>>>> parent of c31a3a2 (Update notifications.js)
  