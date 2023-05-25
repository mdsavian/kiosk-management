import Router, { Express } from "express";

const kioskRouter: Express = Router();

kioskRouter.get("/"); // KioskController)
kioskRouter.get("/:id"); // KioskController)
kioskRouter.post("/"); // KioskController)
kioskRouter.delete("/:id"); // KioskController)
kioskRouter.patch("/:id"); // KioskController)

export default kioskRouter;
