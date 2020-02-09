import uuidv4 from 'uuid/v4';

const user = (sequelize, DataTypes) => {
        const User = sequelize.define('user', {
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.STRING,
                unique: true,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            }
        });

        User.findByLogin = async (uname) => {
            await User.findOne({
                where: {username: uname}
            });
        };

        User.findByUserId = async (id) => await User.findOne({
            where: {userId: id}
        });

        //create new users
        User.addNewUser = async (user) => {
            console.log('USER', user);
            const id = parseInt(uuidv4(), 10);
            console.log(id);
            await User.create({
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: id
            });
        };

        User.destroyUser = async (userId) => await User.destroy({
            where: {userId: userId}
        });

        return User;
    }
;

export default user;
