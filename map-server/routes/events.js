import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.event));
});

router.get('/:eventId', (req,res) => {
  return res.send(req.context.models.event[req.params.eventId]);
});

router.post('/', (req,res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.message[id] = message;

  return res.send(event);
});

router.delete('/:eventId', (req,res) => {
  const {
    [req.params.eventId]: event,
    ...otherMessages
  } = req.context.models.event;
  req.context.models.event = otherEvent;

  return res.send(event);
})

export default router;
