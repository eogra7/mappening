//model 1.0
const event = (sequelize, DataTypes) => {
  const Event = sequelize.define('event',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
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
    lifespan: {
      type: DataTypes.INTEGER,
    }

  });

  // Find an event by its unique identifier
  Event.findById = async (eventId) => {
    return await Event.findOne({
      where: {id: eventId}
    });
  };


  return Event;
};

export default event;
