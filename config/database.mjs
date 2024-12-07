import { Sequelize } from "sequelize";

const sequelize = new Sequelize('demo', 'shamsi', 'abc123', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

export default sequelize;
