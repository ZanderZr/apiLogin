import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pruebas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;