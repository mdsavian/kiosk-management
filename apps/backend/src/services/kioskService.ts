import KioskModel from "../models/kiosk";
import { KioskDTO } from "types";
import moment from "moment";

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

    if (kioskToUpdate.isKioskClosed === undefined) {
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

  async openCloseKiosk() {
    console.log("INIT open/close kiosks");
    const kiosks = await this.getAll();

    moment.locale("pt-br");

    kiosks.forEach((kiosk) => {
      if (!kiosk.storeClosesAt || !kiosk.storeOpensAt) {
        return;
      }
      const isKioskOpen = this.kioskIsOpen(kiosk.storeOpensAt, kiosk.storeClosesAt);

      console.log(
        `current kiosk state, serialKey: ${kiosk.serialKey} isClosed: ${kiosk.isKioskClosed} isKioskOpen: ${isKioskOpen}`
      );

      if (isKioskOpen === kiosk.isKioskClosed) {
        const newState = !kiosk.isKioskClosed;

        console.log(
          `UPDATING kiosk state serialKey: ${kiosk.serialKey} new state: ${
            newState ? "CLOSED" : "OPEN"
          }`
        );

        KioskModel.updateOne({ _id: kiosk._id }, { $set: { isKioskClosed: newState } })
          .then(() => {
            console.log(
              `Kiosk state UPDATED serialKey: ${kiosk.serialKey} new state: ${
                newState ? "CLOSED" : "OPEN"
              }`
            );
          })
          .catch((error) => {
            console.error(`Error updating kiosk state serialKey: ${kiosk.serialKey} ${error}`);
          });
      }
    });
  }

  kioskIsOpen(storeOpensAt: Date, storeClosesAt: Date): boolean {
    const startMomentDate = moment(storeOpensAt, "YYYY-MM-DDTHH:mm:ss");
    const endMomentDate = moment(storeClosesAt, "YYYY-MM-DDTHH:mm:ss");
    const currentDate = moment();

    // Set the current date to compare correctly
    startMomentDate.date(currentDate.date());
    endMomentDate.date(currentDate.date());

    // Check if the date/hour is between the start and end dates, include
    return currentDate.isBetween(startMomentDate, endMomentDate, "minutes", "[]");
  }
}

export default new KioskService();
