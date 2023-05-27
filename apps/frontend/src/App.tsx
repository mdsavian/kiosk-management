import * as React from "react";
import "./App.css";
import KioskPage from "./pages/KioskPage";
import SnackbarProvider from "./components/commons/SnackBar/SnackbarProvider";

function App() {
  return (
    <div className="container">
      <SnackbarProvider>
        <KioskPage />
      </SnackbarProvider>
    </div>
  );
}

export default App;
