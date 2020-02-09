import { Router } from 'express';

const router = Router();

// Gets all events
router.get('/all', async (req,res) => {
  try{
    const allEvents = await req.context.models.Event.findAllEvents();
    return res.send(allEvents);
  } catch(err){
    console.log(err);
    return res.send(err);
  }
});

// Gets all events happening now
router.get('/now', async (req,res) => {
    try{
        const allEvents = await req.context.models.Event.findCurrentEvents();
        return res.send(allEvents);
    } catch(err){
        console.log(err);
        return res.send(err);
    }
});

// Gets all events happening in the future
router.get('/future', async (req,res) => {
    try{
        const allEvents = await req.context.models.Event.findFutureEvents();
        return res.send(allEvents);
    } catch(err){
        console.log(err);
        return res.send(err);
    }
});

// Gets all events that have already ended
router.get('/past', async (req,res) => {
    try{
        const allEvents = await req.context.models.Event.findPastEvents();
        return res.send(allEvents);
    } catch(err){
        console.log(err);
        return res.send(err);
    }
});

// Gets an event with given ID
router.get('/:eventId', async (req,res) => {
  try {
      const event = await req.context.models.Event.findById(req.params.eventId);
      return res.send(event);
  } catch(err) {
      console.log(err);
      return res.send(err)
  }
});

// Create an event
router.post('/', async (req, res) => {
  try {
      const newEvent = await req.context.models.Event.addNewEvent(req.body);
      return res.send(newEvent);
  } catch(err) {
      console.log(err);
      return res.send(err)
  }
});

// Delete an event
router.delete('/:eventId', async (req, res) => {
  try {
      await req.context.models.Event.deleteEvent(req.params.eventId);
      return res.send(true);
  } catch(err) {
      console.log(err);
      return res.send(err)
  }
});


export default router;
