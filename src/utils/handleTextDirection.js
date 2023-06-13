import countryTextDirectionMap from './countryTextDirectionMap';

function handleTextDirection() {
    const country = getCountry();
    const textDirection = countryTextDirectionMap[country] || 'ltr'; // Default to LTR if the country is not in the map

    // Remove the existing text direction class
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('text-direction', 'ltr', 'rtl', 'ttb', 'btt', 'mongolian', 'bidirectional');

    // Add the new text direction class dynamically
    htmlElement.classList.add('text-direction', textDirection);
}

export default handleTextDirection;
