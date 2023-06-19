import config from '@/config';
import express from 'express';
import router from '@/router'
import cors from 'cors';
import { createServer } from "http";



const app = express()

app.use(cors())
app.use(express.text({ type: 'text/*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', router);

const server = createServer(app)



export const startApp = () => {
  return server.listen(config.port, async (err?: Error) => {
    if (err) {
      console.error(`Error : ${err}`);
      process.exit(-1);
    }

    console.log(`${config.app} is running on ${config.port}`);
    console.log(`Database: ${config.db.database}`);
  });

  
};



export default app;

