import * as React from "react";
import { KioskDTO } from "types";
import useKiosks from "../hooks/useKiosks";
import KioskTable from "../components/KioskTable";
import DeleteDialog from "../components/DeleteDialog";
import { Button } from "@mui/material";
import KioskForm from "../components/KioskForm";

function KioskPage() {
  const { fetchKiosks } = useKiosks();

  const [kiosks, setKiosks] = React.useState<KioskDTO[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [deleteKioskId, setDeleteKioskId] = React.useState<string>("");
  const [openKioskForm, setOpenKioskForm] = React.useState<boolean>(false);

  const handleDelete = (kioskId: string) => {
    setDeleteKioskId(kioskId);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchKiosks()
      .then((result) => {
        setKiosks(result.data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && "Loading Spinner TODO"}

      {error && "Message error TODO"}

      {kiosks.length === 0 && "Message empty TODO"}

      <Button
        variant="contained"
        color="success"
        sx={{ alignSelf: "flex-end" }}
        onClick={() => {
          setOpenKioskForm(true);
        }}
      >
        Create Kiosk
      </Button>

      <KioskForm open={openKioskForm} handleCancel={() => setOpenKioskForm(false)} />

      {kiosks.length > 0 && <KioskTable kiosks={kiosks} handleDelete={handleDelete} />}

      <DeleteDialog
        kioskId={deleteKioskId}
        handleClose={() => {
          setDeleteKioskId("");
        }}
        setKiosks={setKiosks}
      />
    </>
  );
}

export default KioskPage;
