import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.user));
});

router.get('/:userId', (req,res) => {
  return res.send(req.context.models.user[req.params.userId]);
});
export default router;
