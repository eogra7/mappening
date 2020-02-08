  import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import routes from './routes';



const app = express();

app.use(cors()); //probably don't need if we're using local host (this is useful for accessing foreign domains
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/session', routes.sessions);
app.use('/user', routes.users);
app.use('/events', routes.events);



let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};

app.get('/', (req, res) => {
    return res.send(Object.values(users));
});
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.BACKEND_PORT, () =>
    console.log('Example app listening on port ' + process.env.BACKEND_PORT),
);
