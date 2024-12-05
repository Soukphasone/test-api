import http from 'http'
import Express from "express"
import Cors from 'cors'

import routeLogin from './routers/router.login'
import routeTest from './routers/router.test'
// import routeUsers from './routers/router.users'
const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(Cors({ origin: true }))

app.use(routeTest)
app.use(routeLogin)
// app.use(routeUsers)

const useHttp = http.createServer(app)
useHttp.listen(5406, () => {
    console.log('--- server ---')
    console.log('--- http://localhost:5406 ---')
})