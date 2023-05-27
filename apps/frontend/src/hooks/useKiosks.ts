import axios from "axios";
import * as React from "react";
import { KioskDTO } from "types";

const KIOSK_URL = `${import.meta.env.VITE_API_URL}/kiosks`;

const useKiosks = () => {
  const fetchKiosks = async () => {
    return await axios.get(`${KIOSK_URL}`);
  };

  const deleteKiosk = async (kioskId: string) => {
    return await axios.delete(`${KIOSK_URL}/${kioskId}`);
  };

  return { fetchKiosks, deleteKiosk };
};

export default useKiosks;
