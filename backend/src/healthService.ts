export class HealthService {
    serveHeath(req: any, res: any) {
        return res.status(200).send("ok")
    }
}