import * as React from "react";
import { KioskDTO } from "types";
import useKiosks from "../hooks/useKiosks";
import KioskTable from "../components/KioskTable";
import DeleteDialog from "../components/DeleteDialog";
import { Alert, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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

  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredKiosks = !searchTerm
    ? kiosks
    : kiosks.filter(
        (kiosk) =>
          kiosk.serialKey?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          kiosk.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

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

      <Grid container direction="row">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          sx={{
            marginRight: "32px",
            width: "500px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="success"
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            setOpenKioskForm(true);
          }}
        >
          Create Kiosk
        </Button>
      </Grid>

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
        <KioskTable kiosks={filteredKiosks} handleDelete={handleDelete} handleEdit={handleEdit} />
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
