module.exports = {
    HOST: "localhost",
    USER: "adminbdd",
    PASSWORD: "adminbdd",
    DATABASE: "test_api",
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 15000,
    }
};