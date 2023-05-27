import cron from "node-cron";
import kioskService from "../services/kioskService";

const closeOpenKioskJob = () => {
  // run every 60 seconds
  cron.schedule("* * * * *", async () => {
    await kioskService.openCloseKiosk();
  });
};

export default closeOpenKioskJob;
