import express from 'express';

export const getCategories = (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello Categories' });
};
