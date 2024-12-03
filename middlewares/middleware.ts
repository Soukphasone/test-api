export function routeMiddleWare(req: any, res: any, next: any) {
    console.log(`------------------------------------------------------------`)
    console.log(`${req.method}: ${req.path}`)
    console.log(`IP: ${req.ip}`)
    console.log(`Body: ${JSON.stringify(req.body)}`)
    next()
}