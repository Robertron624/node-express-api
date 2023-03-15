import express from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler.js';

const app = express();
const PORT = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://localhost:3000','http://localhost:5500', 'https://www.myapp.com', 'http://127.0.0.1:5500/']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true)
    }
    else {
      callback(new Error('Forbidden'))
    }
  }
}
app.use(cors(options));

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
