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

    async fetchCountryTextDirectionMap() {
        try {
            // Create a connection pool
            const pool = await sql.connect(this.config);

            // Call the stored procedure to fetch country and text direction
            const result = await pool.request().query('EXEC GetCountryTextDirectionMap');

            // Close the connection pool
            await pool.close();

            // Map the database result to an object
            const countryTextDirectionMap = {};
            result.recordset.forEach((row) => {
                const countryCode = row.countryCode;
                const textDirection = row.textDirection;
                countryTextDirectionMap[countryCode] = textDirection;
            });

            return countryTextDirectionMap;
        } catch (error) {
            console.error('Failed to fetch country text direction map:', error);
            throw error;
        }
    }
}

module.exports = DatabaseService;
