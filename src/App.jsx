import TableTwo from "../components/TableTwo";
import DeleteModal from "../components/DeleteModal";
import NewSupportDialog from "../components/NewSupportDialog";
import EditSupportModal from "../components/EditSupportDialog";

export default function App() {
  return (
    <div>
      <TableTwo />
      <NewSupportDialog />
      <EditSupportModal />
      <DeleteModal />
    </div>
  );
}
