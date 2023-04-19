import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "cookies-next";
import { parseBody } from "next/dist/server/api-utils/node";
import { getUserToken, isTokenValid } from "src/models/token";

const AUTH_TOKEN_COOKIE_NAME = "authtoken";

const loginController = async ({ req: request, res: response }: {
    req: NextApiRequest,
    res: NextApiResponse
}) => {
    const { name, password } = await parseBody(request, "1mb");
    try {
        const token = await getUserToken(name, password);
        setCookie(AUTH_TOKEN_COOKIE_NAME, token, {req: request, res: response});
        return {redirect: {destination: "/"}};
    } catch {
        return {redirect: {destination: "/inicio-sesion?error=Credenciales incorrectas"}};
    }
}

const getAuthtokenFromRequest = (request: NextApiRequest) => {
    return String(getCookie(AUTH_TOKEN_COOKIE_NAME, {req: request}) || "");
}

const isAuthenticated = (controller: (context: any) => any) => async (context: any) => {
    const { req: request }: {req: NextApiRequest} = context;
    const authtoken = getAuthtokenFromRequest(request);
    const tokenvalid = await isTokenValid(authtoken);
    if (tokenvalid) {
        return controller(context);
    }
    return {redirect: {destination: "/inicio-sesion"}};
}

export {
    loginController,
    isAuthenticated
}