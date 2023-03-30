let isOpen = false;

function openDropdown(filter) {
    const dropDownMenu = document.getElementById(`${filter}-dropdown`);
    const inputEl = document.getElementById(`${filter}-input`);
    const filterContainer = document.getElementById(`${filter}-filter`);
    const arrowIcon = document.getElementById(`${filter}-arrow`);
    const allDropdownMenu = document.querySelectorAll('.dropdown');

    if (!isOpen) {
        dropDownMenu.style.visibility = 'visible'
        inputEl.setAttribute('placeholder', getPlaceholder('visible', filter));
        inputEl.style.pointerEvents = 'auto';
        filterContainer.style.width = '667px';
        arrowIcon.setAttribute('src', './assets/arrow_up.svg');
        isOpen = true;
    } else {
        dropDownMenu.style.visibility = 'hidden'
        dropDownMenu.classList.toggle('show');
        inputEl.setAttribute('placeholder', getPlaceholder('hidden', filter));
        inputEl.style.pointerEvents = 'none';
        inputEl.value = '';
        filterContainer.style.width = '170px';
        arrowIcon.setAttribute('src', './assets/arrow_down.svg');
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