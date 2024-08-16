import TableTwo from "../components/TableTwo";
import DeleteModal from "../components/DeleteModal";
import NewSupportDialog from "../components/NewSupportDialog";

export default function App() {
  return (
    <div>
      <TableTwo />
      <NewSupportDialog />
      <DeleteModal />
    </div>
  );
}
