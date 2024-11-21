module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nativeIdentity: { type: DataTypes.STRING, unique: true, allowNull: false }, // Unique identifier for SailPoint mapping
    firstName: { type: DataTypes.STRING }, // First name of the user
    lastName: { type: DataTypes.STRING }, // Last name of the user
    username: { type: DataTypes.STRING, unique: true }, // Username
    email: { type: DataTypes.STRING, unique: true }, // Email address
    status: { type: DataTypes.STRING, defaultValue: 'active' }, // Account lifecycle state (active, inactive, etc.)
    employeeId: { type: DataTypes.STRING }, // Employee identifier
    hireDate: { type: DataTypes.DATE }, // Employee's hire date
    terminationDate: { type: DataTypes.DATE }, // Termination date (if applicable)
    department: { type: DataTypes.STRING }, // Department of the user
    division: { type: DataTypes.STRING }, // Division under which the user operates
    location: { type: DataTypes.STRING }, // User's location
    costCenter: { type: DataTypes.STRING }, // Cost center for financial grouping
    region: { type: DataTypes.STRING }, // Geographical region of the user
    jobTitle: { type: DataTypes.STRING }, // User's job title
    manager: { type: DataTypes.STRING }, // Identifier for the user's manager
    country: { type: DataTypes.STRING }, // Country of the user
    city: { type: DataTypes.STRING }, // City of the user
    postalCode: { type: DataTypes.STRING }, // User's postal code
    phoneNumber: { type: DataTypes.STRING }, // Phone number of the user
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for creation
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }, // Timestamp for last update
  });

  return User;
};