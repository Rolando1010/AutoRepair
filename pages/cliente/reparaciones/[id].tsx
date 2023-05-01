import { WorkOrder } from "src/models/types";
import { ClientLayout } from "src/views/layouts/index";
import WorkOrderDetail from "src/views/pages/workorder-detail";

export { workOrderController as getServerSideProps } from "src/controllers/workorders";
export default ({ workorder }: { workorder: WorkOrder }) =>
    <ClientLayout>
        <WorkOrderDetail workorder={workorder}/>
    </ClientLayout>