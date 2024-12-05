import Express from "express"
import { login } from '../controllers/login.control'

const route = Express.Router()

route.post('/login', async (req, res) => {

    const rqData = req.body
    const data = await login(rqData)
    res.send(data)
})

export default route