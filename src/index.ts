import express from 'express';
import bodyParser from 'body-parser';
import router from './routers';
import { handleErrors } from './middleware';
import { HttpCode, HttpError } from './exceptions/http-error';

const app = express();

app.use(bodyParser.json());

const PORT = parseInt(process.env.SERVER_PORT || '3000');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(router());
app.use(
  '*',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = new HttpError({
      httpCode: HttpCode.NOT_FOUND,
      description: 'API endpoint not found',
    });
    next(err);
  }
);
app.use(handleErrors);
