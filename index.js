import express from 'express';
import routerApi from './routes/index.js';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api', (req, res) => {
  res.send('Hello, world! this is the api route!');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Escuchando en el puerto: ' + PORT);
});
