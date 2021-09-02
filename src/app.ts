import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";
import ConnectDB from './config/connection';
import systemConstant from "./config/system-constant";
const mongoose = require('mongoose');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/', routes);

// connect db
mongoose.connect(systemConstant.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
  // logger.info('Connected to MongoDB');
  app.listen(process.env.PORT || systemConstant.portLocal, () => {
    console.log(`Listening to port ${process.env.PORT || systemConstant.portLocal}`);
  });
});





// class Server {
//   public app: express.Application;
//   private connectDB: ConnectDB = new ConnectDB();

//   constructor() {
//     this.app = express();
//     this.config();
//     this.routes();
//   }

//   public routes(): void {
//     this.app.use("/", routes);
//   }

//   public config(): void {
//     this.app.set("port", process.env.PORT || systemConstant.portLocal);
//     this.app.use(bodyParser.json());
//     this.app.use(bodyParser.urlencoded({ extended: false }));
//     this.app.use(cors());
//     this.connectDB.mongoSetup()
//   }

//   public start(): void {
//     this.app.listen(this.app.get("port"), () => {
//       console.log("Server running at http://localhost:%d", this.app.get("port"));
//     });
//   }
// }

// const server = new Server();

// // Connects to the Database -> then starts the express
// // createConnection().then(async () => {
// server.start();
// // });