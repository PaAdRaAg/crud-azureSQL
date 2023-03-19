const { Sequelize } = require('sequelize');
const UserModel = require('./models/users');


// Configuración de Sequelize
const sequelize = new Sequelize({
    dialect: 'mssql',
    dialectModule: require('tedious'),
    host: 'hostname.database.windows.net',
    port: 1433,
    database: 'databasename',
    username: 'username',
    password: 'password',
    options: {
        encrypt: true
    }
});

const User = UserModel(sequelize, Sequelize);

// Verificar la conexión
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection established successfully');
    } catch (error) {
        console.error('Failed to connect:', error);
    }
}

testConnection();

// Sincronizar el modelo con la base de datos
sequelize.sync()
    .then(() => {
        console.log('Model synchronized with the database.');
    })
    .catch((error) => {
        console.error('Error synchronizing model with database:', error);
    });

module.exports = {
    User
};
