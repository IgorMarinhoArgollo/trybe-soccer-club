import * as express from 'express';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import errorMiddleware from './middlewares/errorMiddleware';
import LoginRouter from './routes/LoginRouter';
import TeamRouter from './routes/TeamRouter';
import MatchesRouter from './routes/MatchesRouter';
import LeaderboardRouter from './routes/LeaderboardRouter';
import limiter from './middlewares/Limiter';
import * as swagger from './swagger.json';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorMiddleware();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private routes(): void {
    this.app.use(helmet());
    this.app.use(limiter);
    this.app.use(morgan('common'));
    this.app.use('/login', new LoginRouter().router);
    this.app.use('/teams', new TeamRouter().router);
    this.app.use('/matches', new MatchesRouter().router);
    this.app.use('/leaderboard', new LeaderboardRouter().router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
  }

  private errorMiddleware(): void {
    this.app.use(errorMiddleware);
  }
}

export { App };

export const { app } = new App();
