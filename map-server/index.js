  import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import routes from './routes';
import models, {sequelize} from './models';

const app = express();

app.use(async (req, res, next) => {
  req.context = {
      models,
      me: await models.User.findByLogin('cmyers'),
  };
  next();
});

app.use(cors()); //probably don't need if we're using local host (this is useful for accessing foreign domains
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/sessions', routes.sessions);
app.use('/users', routes.users);
app.use('/events', routes.events);

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(process.env.DB_PORT, () => {
      console.log(`Example app listening on port ${process.env.DB_PORT}!`)
  });
});


app.listen(process.env.BACKEND_PORT, () =>
    console.log('Example app listening on port ' + process.env.BACKEND_PORT),
);
