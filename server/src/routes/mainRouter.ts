import { Router } from 'express';
import { createResourceRouter } from './resourceRouter';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to API'});
});

const controllersPath = path.join(__dirname, './controllers');

fs.readdirSync(controllersPath).forEach((file) => {
  if (file.endsWith('Controller.ts')) {
    const controllerName = file.replace('Controller.ts', '').toLowerCase();

    import(path.join(controllersPath, file)).then((controllerModule) => {
      const controller = controllerModule.default;

      router.use(`/${controllerName}`, createResourceRouter(controller));
    }).catch((err) => {
      console.error(`An error occurred ${file}:`, err);
    });
  }
});

router.use((req, res) => {
  res.sendStatus(404);
});

export default router;
