import { workOrdersController } from "src/controllers/adviser";
import WorkOrdersList from "src/views/pages/workorders";

export const getServerSideProps = workOrdersController;

export default WorkOrdersList;