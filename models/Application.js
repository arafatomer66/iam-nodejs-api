module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Unique database ID
        nativeIdentity: { type: DataTypes.STRING, unique: true, allowNull: false }, // Unique application identifier
        appName: { type: DataTypes.STRING, allowNull: false }, // Name of the application
        owner: { type: DataTypes.STRING }, // Owner of the application
        baseURL: { type: DataTypes.STRING, allowNull: false }, // Base URL for API requests
        authenticationMethod: { type: DataTypes.STRING, allowNull: false }, // Authentication method (e.g., OAuth2, API Token)
        clientId: { type: DataTypes.STRING }, // Client ID for OAuth2 authentication
        clientSecret: { type: DataTypes.STRING }, // Client Secret for OAuth2 authentication
        tokenURL: { type: DataTypes.STRING }, // Token URL for generating access tokens
        refreshToken: { type: DataTypes.STRING }, // Refresh token for OAuth2 authentication
        grantType: { type: DataTypes.STRING }, // Grant type (e.g., Password, Client Credentials, JWT)
        certificate: { type: DataTypes.STRING }, // Client certificate for mutual TLS authentication
        certificateKey: { type: DataTypes.STRING }, // Private key for client certificate
        applicationType: { type: DataTypes.STRING }, // Type of application (e.g., Role-based, Group-based)
        schemaAttributes: { type: DataTypes.JSON }, // Schema attributes configured for the application
        isPartitioned: { type: DataTypes.BOOLEAN, defaultValue: false }, // Whether the application uses partitioned aggregation
        partitionSchema: { type: DataTypes.JSON }, // Details about partitions if applicable
        createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for creation
        updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    });
  
    return Application;
  };

  