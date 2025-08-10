import express from 'express'
import { createRoles } from './libs/initialSetup.js'
import auth from './routes/auth.routes.js'
import henRoutes from './routes/hens.routes.js'
import intake from './routes/intakes.routes.js'
import register from './routes/registers.routes.js'
import shedRoutes from './routes/sheds.routes.js'
import userRoutes from './routes/users.routes.js'
import morgan from 'morgan'

const app = express()
createRoles()

app.use(express.json())
app.use("/api", auth, henRoutes, intake, register, shedRoutes, userRoutes)
app.use(morgan('dev'))

export default app;