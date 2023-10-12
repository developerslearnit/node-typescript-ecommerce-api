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
    const { name, metatitle, metadesc, imageurl, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const existingCategory = await db.category.findFirst({
      where: {
        name: name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await db.category.create({
      data: {
        name,
        slug: name.toLowerCase().replace(' ', '-'),
        metaTitle: metatitle,
        metaDescription: metadesc,
        imageUrl: imageurl,
        description: description,
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.log('[CATEGORY_ADD_ERROR]', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
