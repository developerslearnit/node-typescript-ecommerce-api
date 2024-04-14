import { Request, Response, NextFunction } from 'express';

export function paginateResults(model: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 2;
    const last_page = req.query.last_page;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const totalCount = model.count();
  };
}
