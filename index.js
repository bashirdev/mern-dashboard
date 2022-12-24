import  express  from "express";
import bodyParser from "body-parser";
import  mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from "morgan";
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import salesRoutes from './routes/sales.js'
import managementRoutes from './routes/management.js'

//Data import
 
import User from "./models/User.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";


// Configuration

dotenv.config();


const app= express();
app.use(cors())
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))






// Routes

app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)

// MONGOOSE SETUP
const PORT=process.env.PORT || 5000

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server run on port ${PORT}`);
        // only Add Data one Time
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)
        // User.insertMany(dataUser)
    })
}).catch(err=> console.log(`${err.message}, did not connect to mongoose server`))