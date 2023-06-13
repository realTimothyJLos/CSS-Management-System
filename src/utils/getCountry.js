const { getSecretValue } = require("./azureKeyVault");

async function getCountry() {
    try {
        // Retrieve the subscription key from Azure Key Vault
        const subscriptionKey = await getSecretValue('YOUR_SUBSCRIPTION_KEY_SECRET_NAME');

        // Make a request to Azure Maps to get the user's location based on their IP address
        const url = `https://atlas.microsoft.com/location/ip/json?subscription-key=${subscriptionKey}`;
        const response = await fetch(url);
        const data = await response.json();

        // Extract the country code from the response
        const country = data.countryCode;

        if (country) {
            return country;
        } else {
            throw new Error('Country code not available');
        }
    } catch (error) {
        console.error('Failed to retrieve country:', error);
        // Return the default country code
        return 'UK';
    }
}

export default getCountry;