import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";

export const getServerSideProps = ({ query }: {query: NextApiRequestQuery}) => {
    return {props: {error: query.error || null}};
}

export { default } from "src/views/pages/login";