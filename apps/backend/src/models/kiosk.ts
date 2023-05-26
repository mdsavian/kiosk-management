import { Schema, model } from "mongoose";

const KioskSchema = new Schema({
  serialKey: String,
  description: String,
  isKioskClosed: Boolean,
  storeOpensAt: Date,
  storeClosesAt: Date,
});

const KioskModel = model("Kiosk", KioskSchema);

export default KioskModel;
