import { useState } from "react";
import HomeModal from "./HomeModal";
import HomeForm from './HomeForm';
import MainLayout from "../../layouts/MainLayout";

function Home() {
  // Handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainLayout>
      <div className="container">
        <h1>Create Employee</h1>
        <HomeForm handleOpen={handleOpen} />
      </div>
      <HomeModal open={open} handleClose={handleClose} />
    </MainLayout>
  );
}

export default Home;
