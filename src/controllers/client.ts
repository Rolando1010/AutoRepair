import { getWorkOrders } from "src/models/workorder";
import { isViewAuthenticated } from "./auth";

const reparationsController = isViewAuthenticated(async (_, client) => {
    const workorders = await getWorkOrders(`WHERE client.id = ${client.id}`);
    return {props: {workorders, client}}
});

export {
    reparationsController
}