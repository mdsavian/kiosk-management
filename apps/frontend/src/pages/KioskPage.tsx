import * as React from "react";
import { KioskDTO } from "types";
import useKiosks from "../hooks/useKiosks";
import KioskTable from "../components/KioskTable";
import DeleteDialog from "../components/DeleteDialog";
import { Alert, Button, Typography } from "@mui/material";
import KioskForm from "../components/KioskForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

function KioskPage() {
  const { fetchKiosks } = useKiosks();

  const [kiosks, setKiosks] = React.useState<KioskDTO[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [deleteKioskId, setDeleteKioskId] = React.useState<string>("");
  const [openKioskForm, setOpenKioskForm] = React.useState<boolean>(false);
  const [kioskToEdit, setKioskToEdit] = React.useState<KioskDTO | undefined>(undefined);

  const handleDelete = (kioskId: string) => {
    setDeleteKioskId(kioskId);
  };

  const handleEdit = (kioskId: string) => {
    const kiosk = kiosks.find((kiosk) => kiosk._id === kioskId);

    if (kiosk) {
      setKioskToEdit(kiosk);
      setOpenKioskForm(true);
    }
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert severity="error">Error fetching kiosks</Alert>;
  }

  return (
    <>
      <Typography variant="h3">Kiosk Management</Typography>
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

      {openKioskForm && (
        <KioskForm
          handleClose={() => {
            setOpenKioskForm(false);
            setKioskToEdit(undefined);
          }}
          setKiosks={setKiosks}
          kiosk={kioskToEdit}
        />
      )}

      {!isLoading && !error && (
        <KioskTable kiosks={kiosks} handleDelete={handleDelete} handleEdit={handleEdit} />
      )}

      {deleteKioskId && (
        <DeleteDialog
          kioskId={deleteKioskId}
          handleClose={() => {
            setDeleteKioskId("");
          }}
          setKiosks={setKiosks}
        />
      )}
    </>
  );
}

export default KioskPage;
