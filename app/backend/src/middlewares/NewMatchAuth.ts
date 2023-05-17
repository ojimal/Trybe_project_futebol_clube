import { NextFunction, Request, Response } from 'express';

const NewMatchAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    const error: Error & { status?: number } = new Error(
      'It is not possible to create a match with two equal teams',
    );
    error.status = 422;
    throw error;
  }
  next();
};

export default NewMatchAuth;
