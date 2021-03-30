const meals = document.getElementById("meals");

getRandomMeal();

async function getRandomMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await response.json();
  const randomMeal = responseData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  console.log(meals);
}

async function getMealBySearch(term) {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  console.log(meal);
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
   <div class="meal-header">
   ${
     random
       ? `
       <span class="random">
           Random Recipe
       </span>
   `
       : ""
   }
       <img src="${mealData.strMealThumb}" alt="${mealData.Meal}" sizes=""
           srcset="">
   </div>
   <div class="meal-body">
       <h4>${mealData.strMeal}</h4>
       <button class="fav-btn">
           <i class="fa fa-heart" aria-hidden="true"></i>
       </button>
   </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
  });

  meals.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = localStorage.setItem(
    "mealIds",
    JSON.stringify(
      mealIds.filter((id) => {
        return (id !== mealId)
      })
    )
  );
}


function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds===null?[]:mealIds;
}

