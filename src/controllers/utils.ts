import { NextApiRequest } from "next"
import { parseBody } from "next/dist/server/api-utils/node";

const getBody = (request: NextApiRequest) => {
    return parseBody(request, "1mb");
}

export {
    getBody
}