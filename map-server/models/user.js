const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user',{
    username:{
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
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

  return User;
};

export default user;
