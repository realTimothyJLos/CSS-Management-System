const sql = require('mssql');

class DatabaseService {
    constructor(getSecretValue) {
        this.getSecretValue = getSecretValue;
        this.config = null;
    }

    async initialize() {
        try {
            // Get the database configuration from Key Vault
            this.config = {
                user: await this.getSecretValue('DatabaseUsername'),
                password: await this.getSecretValue('DatabasePassword'),
                server: await this.getSecretValue('DatabaseServer'),
                database: await this.getSecretValue('DatabaseName'),
            };
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }

    async fetchDynamicImages() {
        try {
            // Create a connection pool
            const pool = await sql.connect(this.config);

            // Call the stored procedure to get dynamic images
            const result = await pool.request().query('EXEC GetDynamicImages');

            // Close the connection pool
            await pool.close();

            // Map the database result to an array of objects
            const dynamicImages = result.recordset.map((row) => ({
                selector: row.selector,
                folder: row.folder,
                variation: row.variation,
                image: row.image,
            }));

            return dynamicImages;
        } catch (error) {
            console.error('Failed to fetch dynamic images:', error);
            throw error;
        }
    }
}

module.exports = DatabaseService;
