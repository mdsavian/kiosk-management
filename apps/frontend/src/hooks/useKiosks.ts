import axios from "axios";
import { KioskDTO } from "types";

const KIOSK_URL = `${import.meta.env.VITE_API_URL}/kiosks`;

const useKiosks = () => {
  const fetchKiosks = async () => {
    return await axios.get(`${KIOSK_URL}`);
  };

  const deleteKiosk = async (kioskId: string) => {
    return await axios.delete(`${KIOSK_URL}/${kioskId}`);
  };

  const createKiosk = async (kiosk: Partial<KioskDTO>) => {
    return await axios.post(KIOSK_URL, kiosk);
  };

  const updateKiosk = async (kiosk: Partial<KioskDTO>) => {
    return await axios.patch(`${KIOSK_URL}/${kiosk._id}`, kiosk);
  };

  return { fetchKiosks, deleteKiosk, createKiosk, updateKiosk };
};

export default useKiosks;
