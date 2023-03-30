class recipeFactory {
    constructor(data) {
        this.name = data.name
        this.time = data.time
        this.description = data.description
        this.ingredients = data.ingredients
    }

    createRecipeCard() {

        const article = document.createElement('article');
        article.setAttribute('class', 'card');

        let ListeIngredients = "";
        this.ingredients.map((element) => {
            ListeIngredients += `
            <li> 
                <span class="bold">${element.ingredient}</span> ${element.quantity == undefined ? '' : ': ' + element.quantity} ${element.unit == undefined ? '' : element.unit} 
            </li>
            `;
        });

        const recipeCard = `
        <div class="card-image"></div>
        <div class="card-info">
            <div>
                <h3>${this.name}</h3>
                <span class="time">
                    <img src="./assets/clock.svg" alt="clock icon" />
                    ${this.time} min
                </span>
            </div>
            <div>
                <ul class="ingredients">
                ${ListeIngredients}
                </ul>
                <p class="steps">${this.description}</p>
            </div>
        </div>
        `

        article.innerHTML = recipeCard;

        return (article);
    }
}