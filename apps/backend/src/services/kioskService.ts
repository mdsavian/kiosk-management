import KioskModel from "../models/kiosk";
import { KioskDTO } from "types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

class KioskService {
  constructor() {}

  async getAll() {
    return await KioskModel.find({}).lean();
  }

  async getById(id: string) {
    return await KioskModel.findOne({ _id: id }).lean();
  }

  async getBySerialKey(serialKey: string) {
    return await KioskModel.findOne({ serialKey: serialKey }).lean();
  }

  async update(id: string, kioskDto: KioskDTO) {
    let kioskToUpdate = kioskDto;

    if (kioskToUpdate.serialKey === undefined) {
      delete kioskToUpdate.serialKey;
    }

    if (kioskToUpdate.description === undefined) {
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

    dayjs.locale("pt-br");
    dayjs.extend(isBetween);

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
    const startDate = dayjs(storeOpensAt, "YYYY-MM-DDTHH:mm");
    const endDate = dayjs(storeClosesAt, "YYYY-MM-DDTHH:mm");
    const currentDate = dayjs(new Date());

    // Set the current date to compare correctly
    startDate.date(currentDate.date());
    endDate.date(currentDate.date());

    return currentDate.isBetween(startDate, endDate, "minutes", "[]");
  }
}

export default new KioskService();
