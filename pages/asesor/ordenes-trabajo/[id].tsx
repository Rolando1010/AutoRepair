import { WorkOrder } from "src/models/types";
import { AdviserLayout } from "src/views/layouts/index";
import WorkOrderDetail from "src/views/pages/workorder-detail";

export { workOrderController as getServerSideProps } from "src/controllers/workorders";
export default ({ workorder }: { workorder: WorkOrder }) =>
    <AdviserLayout>
        <WorkOrderDetail workorder={workorder}/>
    </AdviserLayout>