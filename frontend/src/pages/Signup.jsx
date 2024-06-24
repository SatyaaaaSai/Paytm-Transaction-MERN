import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col jus">
        <div className="rounded-lg  bg-white w-80 text-center p-2 h-max px-4 ">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to creating an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label={"Email"}
            placeholder={"abc@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"123456987"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
               const response= await axios.post("http://localhost:3000/api/v1/user/signup", {
                  firstname:firstName,
                  lastname:lastName,
                  username,
                  password,
                });
                localStorage.setItem("token", response.data.token);
              }}
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already having an account?"}
            buttonText={"Signin"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
