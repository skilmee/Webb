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
});
