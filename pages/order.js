<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    const orderItemsContainer = document.getElementById("order-items");
    const noItemsMessage = document.getElementById("no-items-message");
    const deliveryTypeSelect = document.getElementById("delivery-type");
    const timeInputContainer = document.getElementById("time-input-container");

    // Загрузка данных из localStorage
    const selectedDishes = JSON.parse(localStorage.getItem("selectedDishes")) || [];

    if (selectedDishes.length === 0) {
        noItemsMessage.style.display = "block";
    } else {
        noItemsMessage.style.display = "none";
        selectedDishes.forEach(dish => {
            const dishElement = document.createElement("div");
            dishElement.textContent = `${dish.name} - ${dish.price}₽`;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Удалить";
            removeButton.addEventListener("click", () => {
                removeDish(dish.id);
            });
            dishElement.appendChild(removeButton);
            orderItemsContainer.appendChild(dishElement);
        });
    }

    // Показ поля времени доставки
    deliveryTypeSelect.addEventListener("change", () => {
        if (deliveryTypeSelect.value === "by_time") {
            timeInputContainer.style.display = "block";
        } else {
            timeInputContainer.style.display = "none";
        }
    });

    // Удаление блюда из заказа
    function removeDish(id) {
        const updatedDishes = selectedDishes.filter(dish => dish.id !== id);
        localStorage.setItem("selectedDishes", JSON.stringify(updatedDishes));
        location.reload();
    }

    // Отправка формы
    const orderForm = document.getElementById("submit-order-form");
    orderForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());
        data.dishes = selectedDishes;

        try {
            const response = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("Ошибка при отправке заказа");

            alert("Заказ успешно оформлен!");
            localStorage.removeItem("selectedDishes");
            location.href = "index.html";
        } catch (error) {
            alert(error.message);
        }
    });
=======
// Загрузка данных из localStorage
function loadOrderFromLocalStorage() {
    const savedOrder = JSON.parse(localStorage.getItem("basket"));
    return savedOrder || {};
}

// Отображение состава заказа
function renderOrderSummary(order) {
    const orderItemsContainer = document.getElementById("order-items");
    const emptyMessage = document.getElementById("empty-order-message");
    orderItemsContainer.innerHTML = ""; // Очищаем контейнер

    let totalPrice = 0;

    Object.keys(order).forEach((key) => {
        if (order[key]) {
            const item = order[key];
            totalPrice += item.price;

            // Создаем карточку блюда
            const itemCard = document.createElement("div");
            itemCard.classList.add("order-item");
            itemCard.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name}</p>
                <p>${item.price}₽</p>
                <button data-category="${key}" class="remove-item">Удалить</button>`;
            
            orderItemsContainer.appendChild(itemCard);
        }
    });

    // Если ничего не выбрано, показываем сообщение
    if (totalPrice === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }

    // Обновляем итоговую стоимость
    document.getElementById("total-price").textContent = `${totalPrice}₽`;
}

// Удаление блюда из заказа
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const category = event.target.dataset.category;

        // Удаляем из localStorage и обновляем отображение
        const order = loadOrderFromLocalStorage();
        delete order[category];
        localStorage.setItem("basket", JSON.stringify(order));
        
        renderOrderSummary(order);
    }
});

// Инициализация страницы
document.addEventListener("DOMContentLoaded", () => {
    const order = loadOrderFromLocalStorage();
    renderOrderSummary(order);
>>>>>>> parent of b4764d7 (Update order.js)
});
