import { saveWorkorder } from "src/models/workorder";
import { isAPIAuthenticated } from "./auth"

const workordersController = isAPIAuthenticated(async (request, response, user) => {
    if(request.method !== "POST") return response.status(404).json({success: false});
    const { clientID, vehicle, tasks } = request.body;
    await saveWorkorder(user.id, clientID, vehicle, tasks);
    return response.status(200).json("viendo....");
});

export {
    workordersController
}