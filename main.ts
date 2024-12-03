import http from 'http'
import Express from "express"
import Cors from 'cors'

import routeTest from './routers/router.test'

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(Cors({ origin: true }))

app.use(routeTest)

// app.get('/', (req: any, res: any) => {
//     res.send('Hello guy')
// })

const useHttp = http.createServer(app)
useHttp.listen(5406, () => {
    console.log('--- server ---')
    console.log('--- http://localhost:5406 ---')
})
