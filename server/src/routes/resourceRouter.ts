import { Router, Request, Response, NextFunction } from 'express';

interface Controller {
  getAll?: (req: Request, res: Response, next: NextFunction) => void;
  getOne?: (req: Request, res: Response, next: NextFunction) => void;
  create?: (req: Request, res: Response, next: NextFunction) => void;
  update?: (req: Request, res: Response, next: NextFunction) => void;
  delete?: (req: Request, res: Response, next: NextFunction) => void;
}

export function createResourceRouter(controller: Controller) {
  const router = Router();

  if (controller.getAll) router.get('/', controller.getAll);
  if (controller.getOne) router.get('/:id', controller.getOne);
  if (controller.create) router.post('/', controller.create);
  if (controller.update) router.put('/:id', controller.update);
  if (controller.delete) router.delete('/:id', controller.delete);

  return router;
}
