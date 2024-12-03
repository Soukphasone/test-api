import Express from "express"
import { test } from '../controllers/test.control'
import { routeMiddleWare } from '../middlewares/middleware'

const route = Express.Router()

route.get('/test', routeMiddleWare, async (req, res) => {
    const data = test()
    res.send(data)
})

export default route