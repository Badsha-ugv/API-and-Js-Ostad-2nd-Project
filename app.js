
// const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`


const spinner = document.querySelector(".loader")
const foodList = document.querySelector(".food-list")

window.addEventListener("load",initialLoad)
console.log(spinner);

async function initialLoad() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s`
    let foods = await getFood(url)
    console.log(foods.meals);
    showFood(foods.meals)

}


async function getFood(foodUrl) {
    try {
        
        let foods = await fetch(foodUrl)
        let data = await foods.json()
        spinner.style = "display: none"
        // console.log(data.meals);
        return data
        
    } catch (error) {
        console.log(error);
    }
}

function showFood(foods_) {
    let foodItem = ""
    foods_.forEach(food => {
        let foodCard = `
        <div class="food-card">
                    <div class="food-image">
                        <img src="${food.strMealThumb}" alt="">
                    </div>
                    <div class="food-text">
                        <h3>${food.strMeal}</h3>
                        <p>${food.strInstructions.slice(0,100)}</p>
                    </div>
                    <button id="modalBtn" class="modalBtn" data-id='${food.idMeal}'  >View More</button>
                </div>
        `
        foodItem += foodCard 
    });
    foodList.innerHTML = foodItem



    
    // Modal 
    const modalBtns = document.querySelectorAll(".modalBtn");
    const modal = document.getElementById("modal");
    
    // console.log(modalBtns)
    
    modalBtns.forEach(function (modalBtn) {
        modalBtn.addEventListener("click", showModal);
    });

    // close modal 
    

    window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
    

    
}

const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('search-bar');

searchBtn.addEventListener('click', searchFood)

async function searchFood() {
    let foodName = searchText.value;
    console.log(foodName);
    spinner.style.display = 'block';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    foodList.innerHTML = ""
    const food = await getFood(url);
    if (food.meals == null || food.meals.length == 0) {
        return foodList.innerHTML = `<h2 style="color:red; text-align:center">No Food Found</h2>`
    }
    showFood(food.meals)


}



async function showModal(e) { 
    console.log(e.target.getAttribute('data-id'));
    const itemId = e.target.getAttribute('data-id');
    const dataUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`
    modal.style.display = 'block';
    let foodData = await getFood(dataUrl)
    let newFoodData = foodData.meals[0]
    modal.innerHTML = ""
    const insertedData = `
    <div class="modal-content">
                    <span class="modalCloseBtn">&times;</span>

                    <h3>${newFoodData.strMeal}</h3>
                    <hr>
                    <p >
                    ${newFoodData.strInstructions}
                    </p>
                </div>
    `
    modal.innerHTML += insertedData

    const closeBtns = document.querySelectorAll('.modalCloseBtn');
    console.log('close buttn', closeBtns);
    closeBtns.forEach((btn) => {
        btn.addEventListener('click',closeModal)
    })
    

}

function closeModal() {
    modal.style.display = 'none';
}
