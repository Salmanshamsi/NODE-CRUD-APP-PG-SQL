import { Sequelize } from "sequelize";


const ConnectingToDB = async (ConnectionStr) => {
    
    const sequelize = new Sequelize('postgres', 'root', 'abc123', {
        host: 'localhost',
        dialect: 'postgres'
      });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default ConnectingToDB;