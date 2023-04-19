import { loginController } from "src/controllers/auth";

export const getServerSideProps = loginController;

export default () => null;