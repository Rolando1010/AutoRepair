import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "cookies-next";
import { isTokenValid } from "src/models/token";
import { NextContext } from "./types";
import { type User } from "src/models/types";

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
    controller: (context: NextContext, user: User) => any
) => async (context: NextContext) => {
    const { req: request } = context;
    const user = await validateToken(request);
    if (user) return controller(context, user);
    return {redirect: {destination: "/inicio-sesion"}};
}

const isAPIAuthenticated = (
    controller: (request: NextApiRequest, response: NextApiResponse, user: User) => any
) => async (request: NextApiRequest, response: NextApiResponse) => {
    const user = await validateToken(request);
    if (user) return controller(request, response, user);
    return response.status(401).json({success: false});
}

export {
    setAuthToken,
    isViewAuthenticated,
    isAPIAuthenticated
}