import AppBar from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
const DashBoard = () => {
  return (
    <div className="m-2">
      <AppBar />
      <div className="pt-4 m-4 px-6">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};

export default DashBoard;
