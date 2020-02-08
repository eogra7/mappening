const message = (sequelize,DataTypes) => {
  const Message = sequelize.define('message', {
    name: {
      type: DataTypes.STRING,
    },
    coords: {
      type: DataTypes.DOUBLE,
    },
    icon: {
      type: DataTypes.STRING,
    },
    description:{
      type: DataTypes.STRING,
    }
  });

  /*
  Message.associate = models => {
    Message.hasMany(models.Event);
  };
  */
  
  return Message;
};

export default message;
