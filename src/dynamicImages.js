// Function to set dynamic images based on country
function setDynamicImage(selector, folder, variation, imageName, country) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Element not found: ${selector}`);
        return;
    }

    let blobName = `${folder}/${variation}/${imageName}`;

    // Append country code to blob name if provided
    if (country) {
        blobName += `_${country}`;
    }

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
            setDynamicImage(image.selector, image.folder, image.variation, image.image, country);
        });
    })
    .catch(error => {
        console.error('Failed to fetch dynamic images:', error);
    });
