import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "cookies-next";
import { isTokenValid } from "src/models/token";
import { NextContext } from "./types";

const AUTH_TOKEN_COOKIE_NAME = "authtoken";

const getAuthtoken = (request: NextApiRequest) => {
    return String(getCookie(AUTH_TOKEN_COOKIE_NAME, {req: request}) || "");
}

const setAuthToken = (token: string, request: NextApiRequest, response: NextApiResponse) => {
    setCookie(AUTH_TOKEN_COOKIE_NAME, token, {req: request, res: response});
}

const validateToken = async (request: NextApiRequest) => {
    const authtoken = getAuthtoken(request);
    const tokenvalid = await isTokenValid(authtoken);
    return tokenvalid;
}

const isViewAuthenticated = (
    controller: (context: NextContext) => any
) => async (context: NextContext) => {
    const { req: request, res: response } = context;
    if (await validateToken(request)) return controller(context);
    return {redirect: {destination: "/inicio-sesion"}};
}

const isAPIAuthenticated = (
    controller: (request: NextApiRequest, response: NextApiResponse) => any
) => async (request: NextApiRequest, response: NextApiResponse) => {
    if (await validateToken(request)) return controller(request, response);
    return response.status(401).json({success: false});
}

export {
    setAuthToken,
    isViewAuthenticated,
    isAPIAuthenticated
}