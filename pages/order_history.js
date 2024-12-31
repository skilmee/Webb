document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/orders";
    const apiKey = "ВАШ_API_KEY"; // Замените на ваш ключ API
    const historyContainer = document.getElementById("history");

    // Получение истории заказов
    async function fetchOrders() {
        try {
            const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
            if (!response.ok) throw new Error("Ошибка при загрузке заказов");
            const orders = await response.json();
            displayOrders(orders);
        } catch (error) {
            alert(error.message);
        }
    }

    // Отображение заказов
    function displayOrders(orders) {
        if (orders.length === 0) {
            historyContainer.innerHTML = "<p>У вас пока нет заказов.</p>";
            return;
        }

        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        orders.forEach((order, index) => {
            const orderElement = document.createElement("div");
            orderElement.classList.add("order");

            orderElement.innerHTML = `
                <p><strong>№${index + 1}</strong></p>
                <p>Дата: ${new Date(order.created_at).toLocaleString()}</p>
                <p>Состав: ${formatOrderItems(order)}</p>
                <p>Стоимость: ${calculateOrderTotal(order)}₽</p>
                <p>Доставка: ${
                    order.delivery_type === "by_time"
                        ? `Ко времени (${order.delivery_time})`
                        : "Как можно скорее (с 7:00 до 23:00)"
                }</p>
                <div class="actions">
                    <button class="details-btn" data-id="${order.id}">Подробнее</button>
                    <button class="edit-btn" data-id="${order.id}">Редактировать</button>
                    <button class="delete-btn" data-id="${order.id}">Удалить</button>
                </div>
            `;

            historyContainer.appendChild(orderElement);
        });

        addEventListeners();
    }

    // Форматирование состава заказа
    function formatOrderItems(order) {
        const items = [];
        if (order.soup_id) items.push("Суп");
        if (order.main_course_id) items.push("Главное блюдо");
        if (order.salad_id) items.push("Салат");
        if (order.drink_id) items.push("Напиток");
        if (order.dessert_id) items.push("Десерт");
        return items.join(", ");
    }

    // Расчет стоимости заказа
    function calculateOrderTotal(order) {
        let total = 0;
        if (order.soup_id) total += 150; // Примерная цена
        if (order.main_course_id) total += 300;
        if (order.salad_id) total += 100;
        if (order.drink_id) total += 50;
        if (order.dessert_id) total += 120;
        return total;
    }

    // Добавление обработчиков событий
    function addEventListeners() {
        document.querySelectorAll(".details-btn").forEach((btn) =>
            btn.addEventListener("click", showDetails)
        );
        document.querySelectorAll(".edit-btn").forEach((btn) =>
            btn.addEventListener("click", editOrder)
        );
        document.querySelectorAll(".delete-btn").forEach((btn) =>
            btn.addEventListener("click", deleteOrder)
        );
    }

    // Показ деталей заказа
    function showDetails(event) {
        const orderId = event.target.dataset.id;
        alert(`Детали заказа №${orderId}`); // Замените на модальное окно
    }

    // Редактирование заказа
    function editOrder(event) {
        const orderId = event.target.dataset.id;
        alert(`Редактирование заказа №${orderId}`); // Замените на модальное окно с формой редактирования
    }

    // Удаление заказа
    async function deleteOrder(event) {
        const orderId = event.target.dataset.id;
        const confirmDelete = confirm("Вы уверены, что хотите удалить этот заказ?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${apiUrl}/${orderId}?api_key=${apiKey}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Ошибка при удалении заказа");
            alert("Заказ успешно удалён!");
            location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    fetchOrders();
});
