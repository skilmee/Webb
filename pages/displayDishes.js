import loadDishes from "./load_dishes.js";

let menu = await loadDishes();

const sortedMenu = menu.sort((a, b) => a.name.localeCompare(b.name));

function renderAllCategories(menu) {
    const categories = [...new Set(menu.map((item) => item.category))];
    categories.forEach((categoryId) => {
        const filteredMenu = menu.filter((item) => item.category === categoryId);
        renderDishes(filteredMenu, categoryId);
    });
}

function renderDishes(filteredMenu, categoryId) {
    const parent = document.getElementById(categoryId);
    if (!parent) return;
    
    parent.innerHTML = filteredMenu.map(
        (dish) => `
            <div class="food-elem" data-keyword="${dish.keyword}">
                <img src="${dish.image}" alt="${dish.name}" />
                <p>${dish.name}</p>
                <p>${dish.price}₽</p>
                <button class="add_dish">Добавить</button>
            </div>
        `
    ).join("");
}

const orderPrice = document.getElementById("order_price");

export let basket = {
    soup: { name: "", price: 0 },
    main_dish: { name: "", price: 0 },
    salad_starter: { name: "", price: 0 },
    juice: { name: "", price: 0 },
    dessert: { name: "", price: 0 },
    price() {
        return (
            this.soup.price +
            this.main_dish.price +
            this.salad_starter.price +
            this.juice.price +
            this.dessert.price
        );
    },
};

function updateOrderDisplay(dish) {
    const orderElem = document.getElementById(`${dish.category}_order`);
    if (orderElem) {
        orderElem.querySelector(".order-type-description").innerHTML = `${basket[dish.category].name} ${basket[dish.category].price}₽`;
        orderElem.querySelector("input").value = dish.keyword;
        orderElem.style.display = "block";
    }
    
    orderPrice.style.display = "block";
    orderPrice.querySelector(".order-type-description").innerHTML = `${basket.price()}₽`;
    orderPrice.querySelector("input").value = basket.price();
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add_dish")) {
        const keyword = event.target.closest(".food-elem").dataset.keyword;
        const dish = sortedMenu.find((el) => el.keyword === keyword);
        
        if (dish) {
            basket[dish.category] = { name: dish.name, price: dish.price };
            updateOrderDisplay(dish);

            let selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
            if (!selectedDishes.includes(dish.keyword)) {
                selectedDishes.push(dish.keyword);
                localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));
            }
        }
    }
});

function filterDishes(categoryId, kind = null) {
    const filteredMenu = sortedMenu.filter(
        (item) =>
            item.category === categoryId && (!kind || item.kind === kind)
    );
    
    renderDishes(filteredMenu, categoryId);
}

document.querySelectorAll(".filter_button").forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        const isActive = filterButton.dataset.active === "true";
        const kind = filterButton.dataset.kind;
        const categoryContainer =
            filterButton.closest(".category-container").querySelector(".dish");
        const categoryId = categoryContainer.id;

        filterDishes(categoryId, isActive ? null : kind);
        
        filterButton.dataset.active = !isActive;
        filterButton.classList.toggle("active_button", !isActive);

        filterButton.parentNode.querySelectorAll(".filter_button").forEach((btn) => {
            if (btn !== filterButton) {
                btn.dataset.active = false;
                btn.classList.remove("active_button");
            }
        });
    });
});

renderAllCategories(sortedMenu);
