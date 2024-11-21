module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Unique ID in the database
        userId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key linking to User
        roleId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key linking to Role
        nativeIdentity: { type: DataTypes.STRING, unique: true, allowNull: false }, // Unique identifier for aggregation
        status: { type: DataTypes.STRING, defaultValue: 'active' }, // Tracks the lifecycle status of the user-role mapping
        syncStatus: { type: DataTypes.STRING }, // Synchronization status (e.g., synced, pending)
        createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for creation
        updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for last update
    });
    return UserRole;
  };