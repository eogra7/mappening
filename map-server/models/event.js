//import uuidv4 from 'uuid/v4';
import { Op } from 'sequelize';
//model 1.0
const event = (sequelize, DataTypes) => {
  const Event = sequelize.define('event',{
    eventId: {
      type: DataTypes.STRING,
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
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    }

  });

  //Find all events
  Event.findAllEvents = async () => {
    return await Event.findAll(); //maybe stringify?
  };

  // Find all current events
  Event.findCurrentEvents = async () => {
    const now = new Date();
    return await Event.findAll({
      where: {
        [Op.and]: [
          {
            startTime: {
              [Op.lt]: now
            }
          },
          {
            endTime: {
              [Op.gt]: now
            }
          }
        ]
      }
    })
  };

  // Find all future events
  Event.findFutureEvents = async () => {
    const now = new Date();
    return await Event.findAll({
      where: {
        startTime: {
          [Op.gt]: now
        }
      }
    })
  };

  Event.findPastEvents = async () => {
    const now = new Date();
    return await Event.findAll({
      where: {
        endTime: {
          [Op.lt]: now
        }
      }
    })
  };

  // Event.getEventsInDistance = async (val) => {
  //   const here = val.coord;
  //   const distance = val.distance;
  //   return await Event.findAll({
  //     where: {
  //       [Op.and]: [
  //         {
  //           startTime: {
  //             [Op.lt]: now
  //           }
  //         },
  //         {
  //           endTime: {
  //             [Op.gt]: now
  //           }
  //         }
  //       ]
  //     }
  //   })
  // };

  // Find an event by its unique identifier
  Event.findById = async (eventId) => {
    return await Event.findOne({
      where: {id: eventId}
    });
  };

  /**
   * Finds events by the given category
   * @param eventCat the category to look for
   * @returns {Promise<Model[]>} a promise with the events
   */
  Event.findByCategory = async (eventCat) =>
      await Event.findAll({
        where: {category: eventCat}
      });

  /**
   * Creates a new event in the database
   * @param event the event to add to the database
   * @returns {Promise<Model> | Model} A promise representing the database add
   */
  Event.addNewEvent = async (event) => {
    return Event.create({
      eventId: Math.floor(Math.random() * 10000),
      name: event.name,
      coords: event.coords,
      description: event.description,
      category: event.category,
      icon: event.icon,
      startTime: event.startTime,
      endTime: event.endTime
    });
  };

  /**
   * Deletes the event with the given ID from the DB
   * @param id the ID of event to DESTROY
   * @returns {Promise<number> | number} the promise returning success of deletion
   */
  Event.deleteEvent = async (id) => {
    return Event.destroy({
      where: {eventId: id}
    })
  };

  return Event;
};

export default event;
