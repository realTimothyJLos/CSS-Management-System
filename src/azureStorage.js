const { BlobServiceClient } = require('@azure/storage-blob');

class AzureStorageService {
    constructor(getSecretValue) {
        this.getSecretValue = getSecretValue;
        this.blobServiceClient = null;
        this.containerClient = null;
    }

    async initialize() {
        try {
            // Get the Azure Storage connection string from Key Vault
            const connectionString = await this.getSecretValue('AzureStorageConnectionString');

            // Create a BlobServiceClient instance
            this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

            // Get the Azure Storage container name from Key Vault
            const containerName = await this.getSecretValue('AzureStorageContainerName');

            // Create a container client instance
            this.containerClient = this.blobServiceClient.getContainerClient(containerName);
        } catch (error) {
            console.error('Failed to initialize Azure Storage:', error);
            throw error;
        }
    }

    async getImageUrl(blobName) {
        try {
            const blobClient = this.containerClient.getBlobClient(blobName);
            const url = await blobClient.url; // Await the URL resolution
            return url;
        } catch (error) {
            console.error(`Failed to get image URL for ${blobName}:`, error);
            throw error;
        }
    }
}

module.exports = AzureStorageService;
