import { Router } from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await req.context.models.User.findAll();
    return res.send(users);
});

// get a user by their ID
router.get('/:userId', async (req,res) => {
    const user = await req.context.models.User.findByPk(
        req.params.userId
    );
  return res.send(user);
});

// add a new user
router.post('/', async (req, res) => {
    const newUser = await req.context.models.User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: uuidv4()
    });
    return res.send(newUser);
});

// delete a user
router.delete('/:userId', async (req, res) => {
    await req.context.models.User.destroy({
        where: {userId: req.params.userId}
    });
    return res.send(true);
});

export default router;
