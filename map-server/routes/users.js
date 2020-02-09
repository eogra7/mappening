import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await req.context.models.User.findAll();
        return res.send(users);
    } catch (err) {
        console.log(err);
        return res.send(err);
    }

});

// get a user by their ID
router.get('/:userId', async (req,res) => {
    try {
        const user = await req.context.models.User.findByPk(req.params.userId);
        return res.send(user);
    } catch(err) {
        console.log(err);
        return res.send(err);
    }

});

// add a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await req.context.models.User.addNewUser(req.body);
        return res.send(newUser);
    } catch(err) {
        console.log(err);
        return res.send(err);
    }
});

// delete a user
router.delete('/:userId', async (req, res) => {
    try {
        await req.context.models.User.destroyUser(req.params.userId);
        return res.send(true);
    } catch(err) {
        console.log(err);
        return res.send(false);
    }

});

export default router;
