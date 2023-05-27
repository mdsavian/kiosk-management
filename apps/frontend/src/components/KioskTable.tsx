import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { KioskDTO } from "types";
import * as dayjs from "dayjs";

type Props = {
  kiosks: KioskDTO[];
  handleDelete: (kioskId: string) => void;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const KioskTable: React.FC<Props> = ({ kiosks, handleDelete }) => {
  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial Key</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Closed</StyledTableCell>
              <StyledTableCell>Open At</StyledTableCell>
              <StyledTableCell>Close At</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kiosks.map((kiosk, index) => (
              <TableRow key={`${kiosk.serialKey} ${index}`}>
                <TableCell component="th" scope="row">
                  {kiosk.serialKey}
                </TableCell>
                <TableCell component="th" scope="row">
                  {kiosk.description}
                </TableCell>
                <TableCell>{kiosk.isKioskClosed ? "Yes" : "No"}</TableCell>
                <TableCell>{dayjs(kiosk.storeOpensAt).format("YYYY-MM-DD HH:mm")}</TableCell>
                <TableCell>{dayjs(kiosk.storeClosesAt).format("YYYY-MM-DD HH:mm")}</TableCell>
                <TableCell>
                  {
                    <IconButton onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  }
                </TableCell>
                <TableCell>
                  {
                    <IconButton onClick={() => handleDelete(kiosk._id!)}>
                      <DeleteIcon color="warning" />
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default KioskTable;
