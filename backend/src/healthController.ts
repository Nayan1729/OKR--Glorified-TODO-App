import {HealthService} from "./healthService.js";

export class HealthController {
    service = new HealthService();

    checkHealth(req: any, res: any) {
        return this.service.serveHeath(req, res)

    }
}