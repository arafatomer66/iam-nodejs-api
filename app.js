const express = require('express');
const app = express();
const db = require('./models');
const routes = require('./routes');

require('dotenv').config();

app.use(express.json());
app.use('/api', routes);

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});