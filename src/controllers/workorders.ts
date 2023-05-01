import { getWorkOrder, saveWorkorder } from "src/models/workorder";
import { isAPIAuthenticated, isViewAuthenticated } from "./auth"

const workordersController = isAPIAuthenticated(async (request, response, user) => {
    if(request.method !== "POST") return response.status(404).json({success: false});
    const { clientID, vehicle, tasks } = request.body;
    await saveWorkorder(
        user.id,
        clientID,
        vehicle,
        tasks.map((t: {day: string}) => ({...t, day: new Date(t.day)}))
    );
    return response.status(200).json({success: true});
});

const workOrderController = isViewAuthenticated(async ({ req: request, ...context}) => {
    const { params }: any = context;
    const workorder = await getWorkOrder(Number(params.id));
    return {props: {workorder}};
});

export {
    workordersController,
    workOrderController
}