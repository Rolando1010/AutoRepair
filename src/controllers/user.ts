import { type NextApiRequest, type NextApiResponse } from "next";
import { createUser } from "src/models/user";
import { setAuthToken, isAPIAuthenticated } from "./auth"
import { NextContext } from "./types";
import { parseBody } from "next/dist/server/api-utils/node";
import { getUserToken } from "src/models/token";

const loginController = async ({ req: request, res: response }: NextContext) => {
    const { name, password } = await parseBody(request, "1mb");
    try {
        const token = await getUserToken(name, password);
        setAuthToken(token, request, response);
        return {redirect: {destination: "/"}};
    } catch {
        return {redirect: {destination: "/inicio-sesion?error=Credenciales incorrectas"}};
    }
}

const signupController = isAPIAuthenticated((request: NextApiRequest, response: NextApiResponse) => {
    if(request.method !== "POST") return response.status(404).json({success: false});
    const {name, password, role} = request.body;
    createUser(name, password, role);
    return response.status(200).json({success: true});
});

export {
    loginController,
    signupController
}