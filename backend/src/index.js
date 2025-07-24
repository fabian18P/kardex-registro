import express from 'express'
import userRoutes from './routes/users.routes.js'
import shedRoutes from './routes/sheds.routes.js'
import henRoutes from './routes/hen.routes.js'
import morgan from 'morgan'

const app = express() 

app.use(morgan('dev'))
app.use(express.json())
app.use(userRoutes, shedRoutes, henRoutes)

app.listen(process.env.PORT)
console.log('Server on port', process.env.PORT)