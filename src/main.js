import importParentCSS from './styles/importParentCSS';
import importSiteVariations from './styles/importSiteVariations';
import importMobileWebVariations from './styles/importMobileWebVariations';
import importAppVariations from './styles/importAppVariations';
import ABManager from './ab-testing/ab-manager';
import AzureStorageService from './azureStorage';
import DatabaseService from './databaseConfigurations';
import { getSecretValue } from './azureKeyVault';
import handleTextDirection from './utils/handleTextDirection';
import countryTextDirectionMap from './countryTextDirectionMap';
import './dynamicImages';

// Import parent CSS
importParentCSS();

// Import site variations
importSiteVariations();

// Import mobile web variations
importMobileWebVariations();

// Import app variations
importAppVariations();

// Handle RTL dynamically based on country
handleTextDirection(countryTextDirectionMap);

async function main() {
    try {
        // Create an instance of AzureStorageService
        const azureStorageService = new AzureStorageService(getSecretValue);

        // Initialize AzureStorageService
        await azureStorageService.initialize();

        // Create an instance of DatabaseService
        const databaseService = new DatabaseService(getSecretValue);

        // Initialize DatabaseService
        await databaseService.initialize();

        // Fetch dynamic images from the database
        const dynamicImages = await databaseService.fetchDynamicImages();

        // Process dynamic images
        for (const image of dynamicImages) {
            const imageUrl = await azureStorageService.getImageUrl(`${image.folder}/${image.variation}/${image.image}`);
            console.log(imageUrl);
            // Use the image URL as needed
        }

        // Initialize the A/B manager
        ABManager.init();
    } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error
    }
}

// Call the main function
main();
