module.exports = (sequelize, DataTypes) => {
    const RoleEntitlement = sequelize.define('RoleEntitlement', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Unique identifier in the database
        roleId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key linking to Role
        entitlementId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key linking to Entitlement
        nativeIdentity: { type: DataTypes.STRING, unique: true, allowNull: false }, // Unique identifier for SailPoint aggregation
        status: { type: DataTypes.STRING, defaultValue: 'active' }, // Tracks the lifecycle status of the mapping
        inherited: { type: DataTypes.BOOLEAN, defaultValue: false }, // Indicates if the entitlement is inherited
        syncStatus: { type: DataTypes.STRING }, // Synchronization status (e.g., synced, pending)
        createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for creation
        updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for last update
    });
    return RoleEntitlement;
  };