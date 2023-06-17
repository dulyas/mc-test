import config from '@/config';
import express from 'express';
import routes from '@/routes';
import cors from 'cors';
import * as HTTP from "http";
import * as IO from "socket.io";
import _io from './socket';



const app = express()

app.use(cors())
app.use(express.text({ type: 'text/*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', routes);

const server = HTTP.createServer(app)

const io = new IO.Server(server, {
  cors: {
      origin: "*"
  },
  pingInterval: 5000,
  path: "/socket/"
  // transports: ["websocket"]
});

_io(io)


export const start = () => {
  const _server = server.listen(config.port, async (err?: Error) => {
    if (err) {
      console.error(`Error : ${err}`);
      process.exit(-1);
    }

    console.log(`${config.app} is running on ${config.port}`);
    console.log(`Database: ${config.db.database}`);
  });

};



  export default app;

// app.use('/api', routes);