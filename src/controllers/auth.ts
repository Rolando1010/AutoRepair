import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { parseBody } from "next/dist/server/api-utils/node";
import { getUserToken } from "src/models/token";

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

export {
    loginController
}