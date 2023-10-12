import express from 'express';
import { db } from '../lib/db';

export const getCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await db.category.findMany();
    return res.status(200).json(categories || []);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    console.log('[CATEGORY_ADD_REQUEST]', name);
    const category = await db.category.create({
      data: {
        name,
        slug: name.toLowerCase().replace(' ', '-'),
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.log('[CATEGORY_ADD_ERROR]', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
