const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure Key Vault configurations
const productionKeyVaultUrl = "https://production-key-vault.vault.azure.net";
const localhostKeyVaultUrl = "https://localhost-key-vault.vault.azure.net";

// Function to get a secret value from Azure Key Vault
async function getSecretValue(secretName) {
    let keyVaultUrl;

    // Determine the Key Vault URL based on the environment
    if (process.env.NODE_ENV === "production") {
        keyVaultUrl = productionKeyVaultUrl;
    } else {
        keyVaultUrl = localhostKeyVaultUrl;
    }

    // Create a SecretClient using DefaultAzureCredential
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(keyVaultUrl, credential);

    try {
        // Get the secret value from Azure Key Vault
        const secret = await client.getSecret(secretName);

        // Return the secret value
        return secret.value;
    } catch (error) {
        console.error(`Failed to retrieve secret '${secretName}' from Azure Key Vault:`, error);
        throw error;
    }
}

module.exports = {
    getSecretValue,
};
