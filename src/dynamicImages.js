import { getImageUrl } from './azureStorage';
import { fetchDynamicImages } from './databaseConfigurations';

// Function to set dynamic images
function setDynamicImage(selector, folder, variation, imageName) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Element not found: ${selector}`);
        return;
    }

    const blobName = `${folder}/${variation}/${imageName}`;

    getImageUrl(blobName)
        .then(url => {
            element.style.backgroundImage = `url(${url})`;
        })
        .catch(error => {
            console.error(`Failed to get image URL for ${blobName}:`, error);
        });
}

// Fetch dynamic images from the database
fetchDynamicImages()
    .then(dynamicImages => {
        // Set dynamic background images for different elements
        dynamicImages.forEach(image => {
            setDynamicImage(image.selector, image.folder, image.variation, image.image);
        });
    })
    .catch(error => {
        console.error('Failed to fetch dynamic images:', error);
    });
