import countryTextDirectionMap from './countryTextDirectionMap';

function handleTextDirection() {
    const country = getCountry();
    const textDirection = countryTextDirectionMap[country] || 'ltr'; // Default to LTR if the country is not in the map

    // Remove the existing text direction class
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('text-direction');

    // Add the new text direction class dynamically
    htmlElement.classList.add(textDirection);
}

export default handleTextDirection;
