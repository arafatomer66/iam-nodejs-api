module.exports = (sequelize, DataTypes) => {
  const UserEntitlement = sequelize.define('UserEntitlement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Unique ID in the database
    userId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key referencing User
    entitlementId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key referencing Entitlement
    nativeIdentity: { type: DataTypes.STRING, allowNull: false }, // Unique identifier for aggregation
    status: { type: DataTypes.STRING, defaultValue: 'active' }, // Status of the entitlement (e.g., active, inactive)
    syncStatus: { type: DataTypes.STRING }, // Tracks synchronization status (e.g., synced, pending)
    assignedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp of assignment
    expiresAt: { type: DataTypes.DATE }, // Expiry date of the entitlement
    inherited: { type: DataTypes.BOOLEAN, defaultValue: false }, // Indicates if the entitlement is inherited
    lastUpdated: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Last modification timestamp
    provisioningRequestId: { type: DataTypes.STRING }, // Tracks the request ID for provisioning
    comments: { type: DataTypes.STRING }, // Additional comments or notes
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for creation
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, 
  });
  return UserEntitlement;
};