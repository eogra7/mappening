import { Router } from 'express';

const router = Router();

// router.get('/', (req, res) => {
//     return res.send(Object.values(req.models.event));
// });

router.get('/:eventId', (req,res) => {
  console.log(req.context);
  return res.send(req.models.event[req.params.eventId]);
});


export default router;
