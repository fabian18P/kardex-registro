import express from 'express'
import userRoutes from './routes/users.routes.js'
import shedRoutes from './routes/sheds.routes.js'
import henRoutes from './routes/hens.routes.js'
import morgan from 'morgan'

const app = express()

app.use(userRoutes, shedRoutes, henRoutes)
app.use(morgan('dev'))
app.use(express.json())

export default app;