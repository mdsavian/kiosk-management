import Router, { Express } from "express";
import kioskRouter from "./kiosk";

const router: Express = Router();

router.use("/kiosks", kioskRouter);

export default router;
