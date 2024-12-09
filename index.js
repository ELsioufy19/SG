import connectDB from "./DB/conection.js";
// import appRouter from "./src/modules/app.router.js";
import express  from 'express'
// import setupRoutes from './modules/app.router.js';
import appRouter from "./src/modules/app.router.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
// setupRoutes(app); 
const port = process.env.PORT
 appRouter(app)
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// module.exports = app;