import { getWorkOrders } from "src/models/workorders"
import { isAuthenticated } from "./auth";

const workOrdersController = isAuthenticated(async () => {
    const workorders = await getWorkOrders();
    return {props: {workorders}}
});

export {
    workOrdersController
}