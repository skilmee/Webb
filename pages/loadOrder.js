import { basket } from "./displayDishes.js";

// Загрузка выбранных блюд из localStorage при загрузке страницы оформления заказа
window.onload = () => {
 const orderItemsDiv = document.getElementById("order-items");
 const selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];

 if (selectedDishes.length === 0) {
 document.getElementById("empty-order-message").style.display = "block";
 return;
 }

 selectedDishes.forEach(keyword => {
 const dish = basket[keyword];
 if (dish) {
 orderItemsDiv.innerHTML += `
     <div class="order-item">
         <p>${dish.name} - ${dish.price}₽</p>
         <button class="remove-dish">Удалить</button>
     </div>`;
 }
 });

 // Удаление блюда из заказа
 orderItemsDiv.addEventListener("click", (event) => {
 if (event.target.classList.contains("remove-dish")) {
     const itemDiv = event.target.closest(".order-item");
     const dishName = itemDiv.querySelector("p").innerText.split(" - ")[0];

     for (const category in basket) {
         if (basket[category].name === dishName) {
             basket[category] = { name:"", price:""};
             break;
         }
     }

     itemDiv.remove();

     let selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
     selectedDishes = selectedDishes.filter(item => item !== dishName);
     localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));

     if (selectedDishes.length === 0) {
         document.getElementById("empty-order-message").style.display = "block";
         orderItemsDiv.innerHTML = "";
     }
 }
 });
};

// Обработчик отправки формы оформления заказа на сервер
document.getElementById("checkout-form").addEventListener("submit", async (event) => {

 event.preventDefault(); // Отменяем стандартное поведение формы

 const formData = new FormData(event.target);
 try {

 const response = await fetch('http://lab8-api.std-900.ist.mospolytech.ru/labs/api/orders?api_key=YOUR_API_KEY', { // Замените YOUR_API_KEY на ваш ключ API.
 method:'POST',
 body=formData,
 });

 if (!response.ok) throw new Error('Ошибка при отправке данных');

 document.getElementById("notification-message").innerText= "Заказ успешно оформлен!";
 localStorage.removeItem('selectedDishes'); // Очистка localStorage после успешного оформления

 } catch (error) {

 document.getElementById("notification-message").innerText= `Ошибка:${error.message}`;
 }
});

// Обработчик нажатия на кнопку "Окей"
document.getElementById("notification-ok").addEventListener("click", () => {

 const notification=document.getElementById("notification");
 notification.classList.add("hidden");
});
