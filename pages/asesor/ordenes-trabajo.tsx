import { workOrdersController } from "src/controllers/advisor";

export const getServerSideProps = workOrdersController;

export default ({ workorders }: any) => <h1>{JSON.stringify(workorders)}</h1>;