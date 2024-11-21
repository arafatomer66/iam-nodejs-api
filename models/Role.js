module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Unique ID for the database
        nativeIdentity: { type: DataTypes.STRING, unique: true, allowNull: false }, // Unique identifier for SailPoint aggregation
        roleName: { type: DataTypes.STRING, allowNull: false }, // Name of the role
        displayName: { type: DataTypes.STRING }, // Human-readable name for UI
        description: { type: DataTypes.STRING }, // Description of the role
        isRequestable: { type: DataTypes.BOOLEAN, defaultValue: true }, // Indicates if the role is requestable
        permissions: { type: DataTypes.JSON }, // List of permissions tied to the role
        entitlementIds: { type: DataTypes.JSON }, // Associated entitlements for the role
        createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Creation timestamp
        updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Last modification timestamp
        status: { type: DataTypes.STRING, defaultValue: 'active' }, // Status of the role (e.g., active, inactive)
        applicationId: { type: DataTypes.INTEGER }, // Links the role to an application
    });
  
    return Role;
  };

  