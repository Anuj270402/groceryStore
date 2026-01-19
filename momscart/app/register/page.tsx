"use client";

import { useState } from "react";
import Welcome from "../../components/Welcome";
import RegisterForm from "@/components/RegisterForm"

function Register() {
  const [step,setStep]=useState(1)
  return (
    <div>
      {step==1 ?<Welcome nextstep={setStep}/>:<RegisterForm prev={setStep}/>}
    </div>
  );
}

export default Register;
