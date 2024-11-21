const { Sequelize } = require('sequelize');
const config = require('../config/config');

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false, // Disable logging for cleaner output (optional)
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Entitlement = require('./Entitlement')(sequelize, Sequelize);
db.Role = require('./Role')(sequelize, Sequelize);
db.Application = require('./Application')(sequelize, Sequelize);
db.UserEntitlement = require('./UserEntitlement')(sequelize, Sequelize);
db.RoleEntitlement = require('./RoleEntitlement')(sequelize, Sequelize);
db.UserRole = require('./UserRole')(sequelize, Sequelize);

// Define relationships
// Users <-> Entitlements
db.User.belongsToMany(db.Entitlement, { through: db.UserEntitlement, foreignKey: 'userId' });
db.Entitlement.belongsToMany(db.User, { through: db.UserEntitlement, foreignKey: 'entitlementId' });

// Roles <-> Entitlements
db.Role.belongsToMany(db.Entitlement, { through: db.RoleEntitlement, foreignKey: 'roleId' });
db.Entitlement.belongsToMany(db.Role, { through: db.RoleEntitlement, foreignKey: 'entitlementId' });

// Applications <-> Entitlements
db.Application.hasMany(db.Entitlement, { foreignKey: 'applicationId' });
db.Entitlement.belongsTo(db.Application, { foreignKey: 'applicationId' });

// Users <-> Roles (Optional if needed for user-role relationships)
db.User.belongsToMany(db.Role, { through: db.UserRole, foreignKey: 'userId' });
db.Role.belongsToMany(db.User, { through: db.UserRole, foreignKey: 'roleId' });

module.exports = db;