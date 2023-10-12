import express from 'express';
import bodyParser from 'body-parser';
import router from './routers';

const app = express();

app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(router());
