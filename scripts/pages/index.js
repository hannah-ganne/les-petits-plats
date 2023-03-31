let filteredRecipes = recipes;

function getAllIngredients() {
    const ingredients = filteredRecipes.map(recipe => recipe.ingredients.map(obj => obj.ingredient))
    const uniqueArray = [...new Set([...ingredients.flat()])];

    return uniqueArray
}

function getAllAppareils() {
    const appareils = filteredRecipes.map(recipe => recipe.appliance)
    const uniqueArray = [...new Set([...appareils])];

    return uniqueArray
}

function getAllUstensiles() {
    const ustensiles = filteredRecipes.map(recipe => recipe.ustensils);
    const uniqueArray = [...new Set([...ustensiles.flat()])];

    return uniqueArray
}

function createFilterItems(id, items) {
    const dropdown = document.getElementById(`${id}-dropdown`)
    const filterItems = document.createElement("ul");
    filterItems.setAttribute("class", "filter-items");
    dropdown.innerHTML = '';

    dropdown.appendChild(filterItems);
    items.map(item => {
        const li = document.createElement("li");
        li.onclick = function () {
            const results = searchRecipes(item);
            displayRecipes(results);
            displayTag(item, id);
            if (id === 'ingredient') {
                createFilterItems('ingredient', getAllIngredients());
            } else if (id === 'appareil') {
                createFilterItems('appareil', getAllAppareils());
            } else {
                createFilterItems('ustensile', getAllUstensiles());
            }
        };
        li.innerText = item;
        li.className = id;
        filterItems.appendChild(li);
    })
};

function searchRecipes(keyword) {
    keyword = keyword.toLowerCase().trim();

    const filteredArray = filteredRecipes.filter(recipe => {
        const name = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients.map(i => i.ingredient.toLowerCase()).join(' ');
        const description = recipe.description.toLowerCase();
        return (
            name.includes(keyword) ||
            ingredients.includes(keyword) ||
            description.includes(keyword)
        );
    });

    filteredRecipes = filteredArray;

    return filteredArray;
}

function displayRecipes(recipes) {
    const recipesSection = document.querySelector('.recipes');
    const noRecipe = document.querySelector('.no-recipe');
    recipesSection.innerHTML = '';
    noRecipe.className = 'no-recipe hidden';

    if (recipes.length === 0) {
        noRecipe.className = 'no-recipe visible';
    } else {
        recipes.map(recipe => {
            const recipeModel = new recipeFactory(recipe);
            const recipeCard = recipeModel.createRecipeCard();
            recipesSection.appendChild(recipeCard);
        })
    }
}

function searchIngredients(keyword) {
    keyword = keyword.toLowerCase().trim();
    const ingredients = getAllIngredients();

    const filteredIngredients = ingredients.map(i => i.toLowerCase()).filter(i => i.includes(keyword))

    return filteredIngredients
}

function searchAppareils(keyword) {
    keyword = keyword.toLowerCase().trim();
    const appareils = getAllAppareils();

    const filteredAppareils = appareils.map(a => a.toLowerCase()).filter(a => a.includes(keyword))

    return filteredAppareils
}

function searchUstensiles(keyword) {
    keyword = keyword.toLowerCase().trim();
    const ustensiles = getAllUstensiles();

    const filteredUstensiles = ustensiles.map(u => u.toLowerCase()).filter(u => u.includes(keyword))

    return filteredUstensiles
}

function displayTag(keyword, type) {
    const selectedFilters = document.querySelector('.selected-filters');

    const tag = document.createElement('div');
    tag.className = `selected-filter ${type}`;
    tag.innerText = keyword;
    const xIcon = document.createElement('img');
    xIcon.setAttribute('src', './assets/delete_icon.svg');
    xIcon.setAttribute('alt', 'x icon');
    xIcon.className = 'x-icon';

    tag.appendChild(xIcon);
    selectedFilters.appendChild(tag);
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('#search-input');
    const ingredientInput = document.getElementById('ingredient-input');
    const appareilInput = document.getElementById('appareil-input');
    const ustensileInput = document.getElementById('ustensile-input');
    const filterItems = document.querySelectorAll('ul.filter-items li');
    const ingredientArrow = document.getElementById('ingredient-arrow');
    const appareilArrow = document.getElementById('appareil-arrow');
    const ustensileArrow = document.getElementById('ustensile-arrow');


    searchInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchRecipes(keyword);
            displayRecipes(results);
        } else if (keyword.length < 3) {
            filteredRecipes = recipes;
            displayRecipes(recipes);
        }
    });

    ingredientInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchIngredients(keyword);
            createFilterItems("ingredient", results);
        } else if (keyword.length < 3) {
            createFilterItems("ingredient", getAllIngredients());
        }
    })

    appareilInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchAppareils(keyword);
            createFilterItems("appareil", results);
        } else if (keyword.length < 3) {
            createFilterItems("appareil", getAllAppareils());
        }
    })

    ustensileInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchUstensiles(keyword);
            createFilterItems("ustensile", results);
        } else if (keyword.length < 3 || event.target.value === "") {
            createFilterItems("ustensile", getAllUstensiles());
        }
    })

    ingredientArrow.addEventListener('click', () => {
        createFilterItems("ingredient", getAllIngredients());
    })

    appareilArrow.addEventListener('click', () => {
        createFilterItems("appareil", getAllAppareils());
    })

    ustensileArrow.addEventListener('click', () => {
        createFilterItems("ustensile", getAllUstensiles());
    })

    document.addEventListener('click', function (event) {
        if (event.target.matches('img.x-icon')) {
            var selectedFilter = event.target.closest('.selected-filter');
            selectedFilter.parentNode.removeChild(selectedFilter);
        }
    });
});

const selectedFilters = document.querySelector('.selected-filters');

selectedFilters.addEventListener('DOMNodeRemoved', () => {
    if (selectedFilters.children.length === 1) {
        displayRecipes(recipes);
        filteredRecipes = recipes;
        createFilterItems("ingredient", getAllIngredients());
        createFilterItems("appareil", getAllAppareils());
        createFilterItems("ustensile", getAllUstensiles());
    }
});

function init() {
    createFilterItems("ingredient", getAllIngredients());
    createFilterItems("appareil", getAllAppareils());
    createFilterItems("ustensile", getAllUstensiles());
    displayRecipes(recipes);
};

init();
