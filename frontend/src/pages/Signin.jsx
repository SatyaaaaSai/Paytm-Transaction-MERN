import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col jus">
        <div className="rounded-lg  bg-white w-80 text-center p-2 h-max px-4 ">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credintials to access your account"} />
          <InputBox label={"First Name"} placeholder={"John"} />
          <InputBox label={"Last Name"} placeholder={"Doe"} />
          <InputBox label={"Email"} placeholder={"abc@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456987"} />
          <div>
            <Button label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Signup"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
