import { Router } from 'express';

const router = Router();

router.get('/', (req,res) => {
  return res.send(req.context.models.user[req.context.me.id]);
});

export default router;
