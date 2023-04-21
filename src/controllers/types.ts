import { type NextApiRequest, type NextApiResponse } from "next";

export type NextContext = {req: NextApiRequest, res: NextApiResponse};