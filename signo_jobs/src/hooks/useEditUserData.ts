import { fetchApi } from "@/utils/fetch";
import { parseCookies } from "nookies";
import { useState } from "react";

export default function useEditUserData() {
  const [open, setOpen] = useState("1");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = parseCookies();

  const passwordBlockCheckLogic =
    password && passwordConfirm && password != passwordConfirm;

  function clearStates() {
    setPassword("");
    setPasswordConfirm("");
  }

  function clearMessages() {
    setSuccess("");
    setError("");
  }

  const toggleAccordion = (id: string) => {
    clearMessages();
    if (open === id) {
      setOpen("0");
    } else {
      setOpen(id);
    }
  };

  function modifyData(data: { name?: string; password?: string }) {
    return fetchApi("/api/users/update", {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: {
        authorization: token,
      },
    }).then((res) => {
      if (res.message) {
        setSuccess("true");
        clearStates();
      }
    });
  }

  return {
    modifyData,
    toggleAccordion,
    passwordBlockCheckLogic,
    error,
    success,
    open,
    clearMessages,
    setName,
    name,
    setPassword,
    password,
    setPasswordConfirm,
    passwordConfirm,
  };
}
