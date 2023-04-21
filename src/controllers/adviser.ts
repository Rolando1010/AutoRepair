import { getWorkOrders } from "src/models/workorder"
import { isViewAuthenticated } from "./auth";

const workOrdersController = isViewAuthenticated(async () => {
    const workorders = await getWorkOrders();
    return {props: {workorders}}
});

const usersController = isViewAuthenticated(() => {
    return {props: {}};
});

export {
    workOrdersController,
    usersController
}