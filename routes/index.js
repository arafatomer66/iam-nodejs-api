const express = require('express');
const router = express.Router();
const db = require('../models');

// Generic CRUD Endpoints
function crudRoutes(modelName, route) {
  const Model = db[modelName];

  // GET all
  router.get(route, async (req, res) => {
    try {
      const data = await Model.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET by ID
  router.get(route + '/:id', async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: modelName + ' not found' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST (Create)
  router.post(route, async (req, res) => {
    try {
      const data = await Model.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // PUT (Update)
  router.put(route + '/:id', async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: modelName + ' not found' });
      await data.update(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // DELETE
  router.delete(route + '/:id', async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: modelName + ' not found' });
      await data.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

// Add CRUD routes for all models
crudRoutes('User', '/users');
crudRoutes('Role', '/roles');
crudRoutes('Entitlement', '/entitlements');
crudRoutes('UserEntitlement', '/user-entitlements');
crudRoutes('UserRole', '/user-roles');
crudRoutes('RoleEntitlement', '/role-entitlements');

// Custom Endpoint: Get User Entitlements by Role ID
router.get('/user-entitlements/by-role/:roleId', async (req, res) => {
  try {
    const entitlements = await db.UserEntitlement.findAll({
      include: [
        { model: db.Entitlement },
        {
          model: db.UserRole,
          where: { roleId: req.params.roleId },
          include: [{ model: db.User }],
        },
      ],
    });
    res.json(entitlements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Custom Endpoint: Get User Roles by User ID
router.get('/user-roles/by-user/:userId', async (req, res) => {
  try {
    const roles = await db.UserRole.findAll({
      where: { userId: req.params.userId },
      include: [{ model: db.Role }],
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/assign-role', async (req, res) => {
  const { userId, role } = req.body;

  try {
    // Validate user existence
    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Validate role existence
    const roleData = await db.Role.findOne({ where: { nativeIdentity: role } });
    if (!roleData) return res.status(404).json({ error: 'Role not found' });

    // Get entitlements linked to the role
    const entitlements = await db.Entitlement.findAll({
      include: {
        model: db.RoleEntitlement,
        where: { roleId: roleData.id },
      },
    });

    // Assign entitlements dynamically
    if (entitlements.length === 0)
      return res.status(404).json({ error: 'No entitlements linked to this role' });

    await Promise.all(
      entitlements.map((entitlement) => {
        return db.UserEntitlement.create({
          userId: userId,
          entitlementId: entitlement.id,
          nativeIdentity: `${userId}_${entitlement.nativeIdentity}`,
          status: 'active',
          syncStatus: 'synced',
        });
      })
    );

    res.json({ message: 'Role and associated entitlements assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;