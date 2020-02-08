//model 1.0
const event = (sequelize, DataTypes) => {
  const Event = sequelize.define('event',{
    name: {
      type: DataTypes.STRING,
    },
    coords: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INT,
    },
    lifespan: {
      type: DataTypes.INT,
    },
  })

  /*Event.associate = events => {
    Event.belongsTo(events.User)
  } */
  return Event;
};

export default event;
