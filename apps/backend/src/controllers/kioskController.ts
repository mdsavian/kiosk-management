import { Request, Response } from "express";
import KioskService from "../services/kioskService";

class KioskController {
  constructor() {}

  async getAll(req: Request, res: Response) {
    try {
      const kiosks = await KioskService.getAll();

      return res.status(200).send({ data: kiosks });
    } catch (error) {
      console.error(`Error fetching all kiosks, ${error}`);
      return res.status(500).send(`Error fetching all kiosks, ${error}`);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Id can not be empty");
      }

      const kiosk = await KioskService.getById(id);

      return res.status(200).send({ data: kiosk });
    } catch (error) {
      console.error(`Error fetching kiosk, ${error}`);
      return res.status(500).send(`Error fetching kiosk, ${error}`);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Id can not be empty");
      }

      const kiosk = await KioskService.getById(id);

      if (!kiosk) {
        throw new Error("Kiosk not found");
      }

      const kioskUpdated = await KioskService.update(id, req.body);

      return res.status(200).send({ data: kioskUpdated });
    } catch (error) {
      console.error(`Error updating kiosk, ${error}`);
      return res.status(500).send(`Error updating kiosk, ${error}`);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Id can not be empty");
      }

      const kiosk = await KioskService.getById(id);

      if (!kiosk) {
        throw new Error("Kiosk not found");
      }

      const kioskDeleted = await KioskService.delete(id);

      if (kioskDeleted.deletedCount > 0) {
        return res.status(200).send({ message: "Kiosk deleted successfully" });
      } else {
        throw new Error("delete incompleted");
      }
    } catch (error) {
      console.error(`Error deleting kiosk, ${error}`);
      return res.status(500).send(`Error deleting kiosk, ${error}`);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const kiosk = await KioskService.create(req.body);

      return res.status(200).send({ data: kiosk });
    } catch (error) {
      console.error(`Error updating kiosk, ${error}`);
      return res.status(500).send(`Error updating kiosk, ${error}`);
    }
  }
}

export default new KioskController();
