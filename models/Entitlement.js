module.exports = (sequelize, DataTypes) => {
  const Entitlement = sequelize.define('Entitlement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Unique identifier in the database
    nativeIdentity: { type: DataTypes.STRING, unique: true, allowNull: false }, // Unique identifier for aggregation
    entitlementName: { type: DataTypes.STRING, allowNull: false }, // Name of the entitlement
    entitlementType: { type: DataTypes.STRING }, // Type (e.g., role, permission, group)
    displayName: { type: DataTypes.STRING }, // Display name for SailPoint UI
    description: { type: DataTypes.STRING }, // Description of the entitlement
    isRequestable: { type: DataTypes.BOOLEAN, defaultValue: true }, // Marks entitlement as requestable in SailPoint
    group: { type: DataTypes.STRING }, // Logical grouping of entitlements
    application: { type: DataTypes.STRING }, // Application to which the entitlement belongs
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp of creation
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp of last update
    status: { type: DataTypes.STRING, defaultValue: 'active' }, // Status of the entitlement (active/inactive)
    permissions: { type: DataTypes.STRING }, // Permissions granted by the entitlement
    roles: { type: DataTypes.STRING }, // Roles associated with this entitlement
    parentEntitlement: { type: DataTypes.STRING }, // Parent entitlement if hierarchical
  });

  return Entitlement;
};