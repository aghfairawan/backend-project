require('dotenv').config()

const express =  require('express');
const databaseMidleware = require('./midleware/database-midleware.js');
const authRouter = require('./routes/auth-route.js')
const taskRouter = require('./routes/task-route.js')
const authMiddleware = require('./midleware/authentication-midlware.js')
const helmet = require("helmet");
const cors = require('cors');



const app = express()

app.use(express.json())
app.use(helmet());

const allowedOrigins = ['http://localhost:5173'];


const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      
      callback(null, true);
    } else {
      
      callback(new Error('Not allowed by CORS'));
    }
  },
  
};


app.use(cors(corsOptions));



app.use(databaseMidleware)


app.get("/", (req, res) => {
    res.send("halo dunia ini saya");
  });

app.use('/auth', authRouter)
app.use('/books', authMiddleware, taskRouter)

app.use((err, req, res, next) => {
  console.log(err, `<=================== error ==================`);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  })
})

// const port = 8000;

app.listen(process.env.PORT, () => {
  console.log("running in " + process.env.PORT)
})
