cont user = (sequelize, DataTypes) => {
  const USER = sequelize.define('user',{
    username:{
      type: DataTypes.STRING,
      unique: true,
    },
  });

  return User;
};

export default user;
