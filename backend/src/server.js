import express from 'express'
import cors from 'cors'
import "dotenv/config" 
import loginRouter from './routes/loginRouter.js'
import signupRouter from './routes/signupRouter.js'
import movieRouter from './routes/movieRouter.js'
import tvRouter from './routes/tvRouter.js'


// import bodyparser from  'body-parser'

// db conncetion
import dbConfig from './config/dbConfig.js'
dbConfig()


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));


app.use(express.json())
// app.use(bodyparser.json())

// define route
app.use('/api/login',loginRouter)
app.use('/api/signup',signupRouter)
app.use('/api/movie',movieRouter)
app.use('/api/tv',tvRouter)

// default route
app.get('/', (req, res) => {
  res.send('API is running...')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})


