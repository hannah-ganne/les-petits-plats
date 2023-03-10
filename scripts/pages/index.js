function getAllIngredients() {
    const ingredients = recipes.map(recipe => recipe.ingredients.map(obj => obj.ingredient))
    const uniqueArray = [...new Set([...ingredients.flat()])];

    return uniqueArray
}

function getAllAppareils() {
    const appareils = recipes.map(recipe => recipe.appliance)
    const uniqueArray = [...new Set([...appareils])];

    return uniqueArray
}

function getAllUstensiles() {
    const ustensiles = recipes.map(recipe => recipe.ustensils);
    const uniqueArray = [...new Set([...ustensiles.flat()])];

    return uniqueArray
}