var searchFormEl = document.querySelector("#search-form");
var searchInputVal = document.querySelector(".form-input");
var searchBtn = document.querySelector("#add-ingredient");
var recipeBtn = document.querySelector("#searchRecipeBtn");
var pantry = [];
const RAPIDAPI_KEY = "b991af6626msh20817527d58c008p114012jsnafbe85f9a112";
const intro = document.querySelector(".intro");
const more = document.querySelector(".more");
const searchInput = document.querySelector(".searchInput");
const clickInfo = document.querySelector(".click-info");
const searchFrom = document.querySelector(".d-flex");
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
const controller = new ScrollMagic.Controller();
const tm = TweenMax;

const INGRD_URL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=";
//const INGRD2RECIPES_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1"
const SPOON_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

const getData = async (url, host) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": host,
    },
  });
  // Error Catching
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  // Response
  return await response.json();
};
//  Search Form Element specialized for ingredient input | Combines the search query with the API url
async function handleSearchFormSubmit(event) {
  event.preventDefault();
  // alert("handle form submit")
  var searchInputVal = document.querySelector(".form-input").value;
  if (!searchInputVal) {
    console.error("You need a search input value!");

    return;
  }
  // Takes the search query
  ingrdUrl = INGRD_URL + searchInputVal + "&number=4";
  console.log(ingrdUrl);
  return ingrdUrl;
}
async function appendPantry(event) {
  event.preventDefault();
  // alert("handle form submit")
  var searchInputVal = document.querySelector(".form-input").value;
  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }
  console.log(`Appending (${searchInputVal}) to pantry`);
  // Takes the search query
  // pantry.push(searchInputVal+"%2C");
  pantry.push(searchInputVal);
  console.log(`Pantry items are:${pantry}`);
  localStorage.setItem("pantry", pantry);
  return pantry;
}
// SEARCH FOR RECIPES
async function searchRecipes(event) {
  event.preventDefault();
  console.log("+++++");
  let app = document.querySelector("#container");
  // // GET USER QUERIED INGREDIENTS
  urlString = localStorage.getItem("pantry").split("&");
  console.log(`ingredients string is: ${urlString}`);
  console.log("+++++");
  RECIPE_URL =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" +
    urlString +
    "&number=10&ignorePantry=true&ranking=1";
  console.log(RECIPE_URL);
  const recipesObj = await getData(RECIPE_URL, SPOON_HOST);
  console.log(recipesObj);
  // Erases search results after each user query below search bar
  // app.innerHTML = "";
  // UPDATE UI WITH INGREDIENT IMG & NAME DATA
  recipesObj.forEach((recipe) => {
    let img = recipe.image;
    app.innerHTML += `
    <div class="module pink">
      <div class="img  col-md-4">
        <div class="img-card">
          <h1>${recipe.title}</h1>
          <img class="img-size" src=${img} alt="">
        </div>
        <div class="recipe-info">
          <span>${recipe.usedIngredients.name}</span><br>
          <span>${recipe.usedIngredients.name}</span><br>
          <span>${recipe.usedIngredients.name}</span><br>
          <span>M%M</span><br>
          <span>M%M</span><br>
          <span>M%M</span><br>
          <span>M%M</span><br>
          <span>M%M</span><br>
        </div>
    </div>
    </div>`;
  });
}
const runApiQueries = async (search) => {
  let app = document.querySelector("#click-info");
  // // GET USER QUERY URL
  const a = await handleSearchFormSubmit(event);
  console.log(`ingredient url is: ${a}`);
  // // GET INGREDIENT SETS
  const ingredientList = await getData(a, SPOON_HOST);
  console.log(ingredientList);
  if (ingredientList > 0) {
    const response = await fetch(`/api/items`, {
      method: "POST",
      body: JSON.stringify({ ingredientList }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let matches = ingredientList.filter((ingredent) => {
    const regex = new RegExp(`^${search}`, "gi");
    return ingredent.name.match(regex);
  });
  console.log(matches);

  if (search.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  //   let img =
  //   "https://spoonacular.com/cdn/ingredients_250x250/" + ingredient.image;
  // app.innerHTML += `<div class="flex-row align-center justify-center min-100-vh bg-primary">
  //     <div class="col-12 col-md-9 flex-column align-center bg-light p-5">
  //       <h1 class="text-primary"> ${ingredient.name}</h1>
  //         <img
  //         class="h-auto w-48 flex-none rounded-l object-cover"
  //         src=${img}
  //         alt="Image Description"
  //         />
  //       <form  class="form w-100">
  //       <button id="${index}-${ingredient.name}" class="btn btn-outline-success" type="submit">Add</button>
  //       </form>
  //     </div>

  //   </div>`;
  // Erases search results after each user query below search bar
  app.innerHTML = "";
  // UPDATE UI WITH INGREDIENT IMG & NAME DATA
  ingredientList.forEach((ingredient) => {
    let img =
      "https://spoonacular.com/cdn/ingredients_250x250/" + ingredient.image;
    app.innerHTML += `
    <div class="module-search  col-md-2">
      <div class="img-search  col-md-4">
        <div class="img-card-search">
          <h1> ${ingredient.name}</h1>
          <img class="img-size-search" src=${img}
            alt="Image Description style="max-width=100px"
            />

          </div>
          </div>
      </div>
    `;

    // const items = [];
    // const addBtn = document.getElementById(`${index}-${ingredient.name}`);
    // addBtn.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log(event);

    //   test(event);
    // });
  });
};

{
  /* <script>
const test = (event) => {
  
  event.preventDefault();
  console.log(this);
  console.log(event);
  alert("addme");

};
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("addmeeeee");
  console.log("submitted")});
</script> */
}
// const runApiQueries = async () => {
//   const app = document.querySelector("#app");

//   const ingredientList = await getData(INGRD_URL, SPOON_HOST);
//   console.log(ingredientList);
// };

// ingredientList.forEach((ingredient) => {
//     let img = "https://spoonacular.com/cdn/ingredients_250x250/"+ingredient.image;
//     app.innerHTML += `
//     <div class="max-w-2xl w-full flex border-2 border-gray-300 shadow-lg">
//       <img
//         class="h-auto w-48 flex-none rounded-l object-cover"
//         src=${img}
//         alt="Image Description"
//       />
//       <div
//         class="
//           bg-white
//           rounded-r
//           p-4
//           flex flex-col
//           justify-between
//           leading-normal
//         "
//       >
//         <div class="mb-0">
//           <div class="text-black font-bold text-xl mb-0">
//             ${ingredient.name}
//           </div>
//           <p class="text-grey-darker text-sm overflow-hidden overflow-ellipsis max-h-24">
//             ${ingredient.name}
//           </p>
//         </div>
//       </div>
//     </div>
//     `;
// });

searchInputVal.addEventListener("input", runApiQueries);
searchBtn.addEventListener("click", appendPantry);
recipeBtn.addEventListener("click", searchRecipes);
// if (ingredientList > 0) {
//   const response = await fetch(`/api/items`, {
//     method: "POST",
//     body: JSON.stringify({ ingredientList }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }
// var ingredients = JSON.stringify(ingredientList);
// comma separated list of ingredients that the recipe needs to search for
// var apiUrl =
//   "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apple" +
//   "&number=5&ignorePantry=true&ranking=1";
// var apiKey = RAPIDAPI_KEY;
// fetch(apiUrl)
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (data) {
//     var recipe1 = data[0];
//     document.getElementById("recipe1title").innerHTML(recipe1.title);
//     document.getElementById("recipe1list").innerHTML(recipe1.list);
//     document
//       .getElementById("recipe1instructions")
//       .innerHTML(recipe1.instructions);
//     document.getElementById("recipe1image").src = recipe1.image;
//     //copy paste for more cards w ingredients.
//   });

//FRANCISCO ^^^^^^^^^

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/items/${id}`, {
//       method: "DELETE",
//     });
//   }
// };
// =
//let app = document.querySelector("#app");
// // GET USER QUERY URL

// console.log("-------------");
// console.log("-------------");
// console.log("-------------+");
// console.log("-------------");
// console.log("-------------");
// console.log("-------------");
// console.log(this + "fafasfasf");
// console.log(event);
// alert("addme");
// const a = await handleSearchFormSubmit(event);
// console.log(`ingredient url is: ${a}`);
// // // GET INGREDIENT SETS
// const ingredientList = await getData(a, SPOON_HOST);
// console.log(ingredientList);
// if (ingredientList > 0) {
//   const response = await fetch(`/api/items`, {
//     method: "POST",
//     body: JSON.stringify({ ingredientList }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }
// };

// document
//   .querySelector("#searchbtn")
//   .addEventListener("click", delButtonHandler);
// let storedCities = [];
// function getStoredItems() {
//   storedItems = JSON.parse(localStorage.getItem("Recent Cities"));
//   if (storedItems !== null) {
//     renderCities();
//   } else {
//     storedItems = [];
//   }
// }

// Animation
// ============
// Background Animation on scroll
// ============

// set desired animation time long enough so that it doesn't skip frames when scrolling fast.
const animationTime = 1700;

// initialise scrollmagic scene
let scene = new ScrollMagic.Scene({
  duration: animationTime,
  triggerElement: intro,
  triggerHook: 0,
})
  .setPin(intro)
  .addTo(controller);

// initalise bodymovin

const elem = document.getElementById("lottie");
let anim;

let delay = 0;
let heightPerFrame = 0;

var animation = ["salt.json"];

scene.on("update", (e) => {
  heightPerFrame = anim.totalFrames / animationTime; // if total animation duration === total frames, then 1px height scroll = 1 frame moved
  delay = Math.round(e.scrollPos * heightPerFrame);
  anim.goToAndStop(delay, true);
});

const animateData = {
  container: elem, //
  renderer: "svg",
  loop: false,
  autoplay: false,
  rendererSettings: { progressiveLoad: false },
  path: animation[Math.floor(Math.random() * animation.length)], // path to json file
};

// tl.from(".intro",2,{
//   y: "400",
//   opacity: 0,
//   ease: Expo.easeInOut,
// });
anim = lottie.loadAnimation(animateData);
// ============
// Background Animation on Start
// ============

// tl.from(".soup-2",1,{
//   rotation:"+=380",
//   repeat: -1,
//   ease: Expo.easeInOut,
// }, )

tl.from(".block", 1, {
  x: "100",
  opacity: 0,
  stagger: 0.15,
  scale: ".8",
  ease: Expo.easeInOut,
});

tm.to(".blocks", 5.1, {
  y: "-460",
  scale: ".4",
  ease: Expo.easeInOut,
});

tm.to(".box", 5.6, {
  y: "-100%",
  ease: Expo.easeInOut,
});

tm.from(".navbar > div", 6.9, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});

tm.from(".title", 6.9, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});
tm.from(".social", 1.6, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});

const intro1 = document.getElementById("intro1");
const helper = document.getElementById("helper");
const container = document.getElementById("container");

gsap.to(container, {
  x: () => -(container.offsetWidth - innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: intro1,
    start: "bottom top",
    invalidateOnRefresh: true,
    markers: false,
    scrub: 1,
    end: () => "+=" + (container.offsetWidth - innerWidth),
  },
});
function searchInputClicked() {
  console.log("++++");
}
// Search Input
searchInput.addEventListener("click", searchInputClicked);

$(document).ready(function () {
  $(".searchInput").click(function () {
    console.log("---");
    $(".click-info").slideToggle(500);
  });
});

// searchInput.addEventListener("input", () => searchIngredients(search.value));
