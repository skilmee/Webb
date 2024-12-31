const loadDishes = async () => {
<<<<<<< HEAD
  let response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
  let menu = await response.json();
  return menu;
}

export default loadDishes;
  
  
=======
    let response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
    let menu = await response.json();
    return menu;
  }
  
  export default loadDishes;
    
    
>>>>>>> parent of 2b5015b (Update load_dishes.js)
