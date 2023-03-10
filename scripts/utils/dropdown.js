let isOpen = false;

function openDropdown(filter) {
    const dropDownMenu = document.getElementById(`${filter}-dropdown`);
    const inputEl = document.getElementById(`${filter}-input`);

    if (!isOpen) {
        dropDownMenu.style.visibility = 'visible'
        inputEl.setAttribute('placeholder', getPlaceholder('visible', filter));
        isOpen = true;
    } else {
        dropDownMenu.style.visibility = 'hidden'
        inputEl.setAttribute('placeholder', getPlaceholder('hidden', filter));
        isOpen = false;
    }
}

function getPlaceholder(visibility, filter) {
    if (visibility === 'visible') {
        switch (filter) {
            case 'ingredient':
                return 'Rechercher un ingrédient'
                break;
            case 'appareil':
                return 'Rechercher un appareil'
                break;
            case 'ustensile':
                return 'Rechercher un ustensile'
                break;
        }
    } else {
        switch (filter) {
            case 'ingredient':
                return 'Ingrédients'
                break;
            case 'appareil':
                return 'Appareils'
                break;
            case 'ustensile':
                return 'Ustensiles'
                break;
        }
    }

}