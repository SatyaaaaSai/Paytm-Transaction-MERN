import { Link } from "react-router-dom";

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center text-sm py-2">
      <div>{label}</div>
      <Link to={to} className="pointer underline pl-1 cursor-pointer ">
        {buttonText}
      </Link>
    </div>
  );
};
