import { getWorkOrders } from "src/models/workorder"
import { isViewAuthenticated } from "./auth";

const workordersController = isViewAuthenticated(async () => {
    const workorders = await getWorkOrders();
    return {props: {workorders}}
});

const workorderController = isViewAuthenticated(() => ({props: {}}));
const usersController = isViewAuthenticated(() => ({props: {}}));

export {
    workordersController,
    workorderController,
    usersController
}