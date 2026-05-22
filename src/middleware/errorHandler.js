import { isHttpError } from 'http-errors';

export function errorHandler(err, req, res, next) {
  const isProd = process.env.NODE_ENV === 'production';

  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  return err.status(500).json({
    message: isProd ? 'Internal server error' : err.stack,
  });
}
