import * as React from "react";
import { KioskDTO } from "types";
import useKiosks from "../hooks/useKiosks";
import KioskTable from "../components/KioskTable";
import DeleteDialog from "../components/DeleteDialog";

function KioskPage() {
  const { fetchKiosks } = useKiosks();

  const [kiosks, setKiosks] = React.useState<KioskDTO[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [deleteKioskId, setDeleteKioskId] = React.useState<string>("");

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