import { createUser, getUserByRoles } from "src/models/user";
import { setAuthToken, isAPIAuthenticated, isViewAuthenticated, removeAuthToken } from "./auth"
import { NextContext } from "./types";
import { verifyCredentials } from "src/models/token";
import { Roles } from "src/models/types";
import { getBody } from "./utils";

const loginController = async ({ req: request, res: response }: NextContext) => {
    const { name, password } = await getBody(request);
    try {
        const {authtoken, user} = await verifyCredentials(name, password);
        setAuthToken(authtoken, request, response);
        const redirections = {
            "": "/",
            [Roles.ADVISER]: "/asesor/ordenes-trabajo",
            [Roles.TECHNICIAN]: "/tecnico/tareas",
            [Roles.CLIENT]: "/cliente/reparaciones"
        }
        return {redirect: {destination: redirections[user.role || ""]}};
    } catch {
        return {redirect: {destination: "/inicio-sesion?error=Credenciales incorrectas"}};
    }
}

const signupController = isAPIAuthenticated((request, response) => {
    if(request.method !== "POST") return response.status(404).json({success: false});
    const {name, password, role} = request.body;
    createUser(name, password, role);
    return response.status(200).json({success: true});
});

const logoutController = isViewAuthenticated(({ req, res }) => {
    removeAuthToken(req, res);
    return {redirect: {destination: "/inicio-sesion"}};
});

const clientsAndTechniciansController = isAPIAuthenticated(async (request, response) => {
    if(request.method !== "GET") return response.status(404).json({success: false});
    return response.status(200).json(await getUserByRoles([Roles.TECHNICIAN, Roles.CLIENT]));
});

export {
    loginController,
    signupController,
    logoutController,
    clientsAndTechniciansController
}