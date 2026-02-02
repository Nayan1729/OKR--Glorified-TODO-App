import express, {Router} from 'express';
import cors from 'cors';
import {HealthController} from "./healthController.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());


 function getHeathStatus() {
  const router = Router();
  const controller = new HealthController()
  router.get('/', (req, res) => {
    console.log('getHeathStatus');

    return controller.checkHealth(req, res)
  })
  return router;
}


app.use('/health', getHeathStatus());

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
