import './style.css';
​
// ++++
​
//const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
​
// Autocompletes Ingredient Search (partial name retrieval) | GET
const INGRD_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=appl&number=10&intolerances=egg"
// Categorizes the Ingredients (name, aisle, and img) | POST
//const PARSE_INGREDIENTS_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/parseIngredients"
// Takes the categorized list of ingredients and returns recipe (name, id, img, used/missed ingredient) | GET
const INGRD2RECIPES_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1"
// Autocompletes Recipe Search (OPTIONAL) | GET
//const RECIP_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete?query=chicken&number=10"
// Extract Recipes from other sites (OPTIONAL) | GET
//const EXTRACT_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F"
// Host url for spoonacular cooking api
const SPOON_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
​
​
// GET Method Fetch function | specialized to rapidAPI headers
const getData = async (url, host) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": host,
    },
  });
  if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
​     return await response.json();
}

​
  // Error Catching
//   if(!response.ok){
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
// ​
//   // Response
//   return await response.json();
// });
​
// //  POST Method Fetch function | specialized to spoonacular rapidAPI headers
// const postData = async (url, host, body) => { 
//   const response = await fetch(url, {
//     method: 'POST',
// ​
//     headers: {
//       accept: 'application/json',
//       "x-rapidapi-key": RAPIDAPI_KEY,
//       "x-rapidapi-host": host,
// ​
//     },
//     "body": {
//       "ingredientList": body,
//       "servings": "1"
//     }
//   })
// ​
//     // Error Catching
//   if(!response.ok){
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
// ​
//   // Response
//   return await response.json();
// };
​
//  Takes multiple async RESTful API requests 
const runApiQueries = async () => {
​
  const app = document.querySelector('#app');
​
  // GET INGREDIENT SETS
  const ingredientList = await getData(INGRD_URL,SPOON_HOST)
  console.log(ingredientList)
​
  // POST INGREDIENT SETS
  // const ingredientInfo = await postData(PARSE_INGREDIENTS_URL,SPOON_HOST,"3 oz pork shoulder")
  // console.log(ingredientInfo)
​
  // UPDATE UI WITH INGREDIENT IMG & NAME DATA
  // ingredientList.forEach((ingredient) => {
  //   let img = "https://spoonacular.com/cdn/ingredients_250x250/"+ingredient.image;
  //   app.innerHTML += `
  //   <div class="max-w-2xl w-full flex border-2 border-gray-300 shadow-lg">
  //     <img
  //       class="h-auto w-48 flex-none rounded-l object-cover"
  //       src=${img}
  //       alt="Image Description"
  //     />
  //     <div
  //       class="
  //         bg-white
  //         rounded-r
  //         p-4
  //         flex flex-col
  //         justify-between
  //         leading-normal
  //       "
  //     >
  //       <div class="mb-0">
  //         <div class="text-black font-bold text-xl mb-0">
  //           ${ingredient.name}
  //         </div>
  //         <p class="text-grey-darker text-sm overflow-hidden overflow-ellipsis max-h-24">
  //           ${ingredient.name}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  //   `;
  // });
​
};
// ​
// runApiQueries();