require('dotenv').config();
import express, { Request, Response as ExpressResponse } from 'express';
import swaggerUi from 'swagger-ui-express'
import {openApi} from "./openapispec"
const cors=require('cors');

const {connect}=require('./db/connection')

const app=express();
app.use(express.json());
app.use(cors());

const port=4005;

async function main() {
    app.use(express.json());

  
    app.get("/api", (req: Request, res: ExpressResponse) => {
      res.status(200).json("hello message") ;
    });

    app.use('/user',require('./routes/userRoutes'));
    app.use('/account',require('./routes/acountRoutes'));
  
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openApi));

}
  
main()
connect()