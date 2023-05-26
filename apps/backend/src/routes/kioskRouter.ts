import Router, { Express } from "express";
import KioskController from "../controllers/kioskController";

const kioskRouter: Express = Router();

kioskRouter.get("/", KioskController.getAll);
kioskRouter.post("/", KioskController.create);
kioskRouter.delete("/:id", KioskController.delete);
kioskRouter.patch("/:id", KioskController.update);
kioskRouter.get("/:id", KioskController.getById);

export default kioskRouter;
