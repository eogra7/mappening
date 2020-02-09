import { Router } from 'express';

const router = Router();

// Gets all events
router.get('/', (req,res) => {
  //console.log('getting all events');
  const allEvents = req.context.models.Event.findAllEvents();
  return res.send(allEvents);
}

// Gets an event with given ID
router.get('/:eventId', (req,res) => {
  console.log(req.context);
  return res.send(req.models.event[req.params.eventId]);
});

// Create an event
router.post('/', (req, res) => {
  const newEvent = req.context.models.Event.addNewEvent(req.body);
  return res.send(newEvent);
});

// Delete an event
router.delete('/:eventId', async (req, res) => {
  await req.context.models.Event.deleteEvent(req.params.eventId);
  return res.send(true);
});


export default router;
