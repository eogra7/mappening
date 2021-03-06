import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'postgres',
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
);
const models = {
    User: sequelize.import('./user'),
    Event: sequelize.import('./event'),
};
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
export { sequelize };
export default models;
