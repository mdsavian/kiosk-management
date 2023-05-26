import KioskModel from "../models/kiosk";
import { KioskDTO } from "types";

class KioskService {
  constructor() {}

  async getAll() {
    return await KioskModel.find({}).lean();
  }

  async getById(id: string) {
    return await KioskModel.findOne({ _id: id }).lean();
  }

  async update(id: string, kioskDto: KioskDTO) {
    let kioskToUpdate = kioskDto;

    if (!kioskToUpdate.serialKey) {
      delete kioskToUpdate.serialKey;
    }

    if (!kioskToUpdate.description) {
      delete kioskToUpdate.description;
    }

    if (!kioskToUpdate.isKioskClosed) {
      delete kioskToUpdate.isKioskClosed;
    }

    if (!kioskToUpdate.storeOpensAt) {
      delete kioskToUpdate.storeOpensAt;
    }

    if (!kioskToUpdate.storeClosesAt) {
      delete kioskToUpdate.storeClosesAt;
    }

    return await KioskModel.findOneAndUpdate(
      { _id: id },
      { $set: kioskToUpdate },
      { returnOriginal: false }
    );
  }

  async delete(id: string) {
    return await KioskModel.deleteOne({ _id: id });
  }

  async create(kioskDTO: KioskDTO) {
    return await KioskModel.create(kioskDTO);
  }

  // TODO close manually
}

export default new KioskService();
