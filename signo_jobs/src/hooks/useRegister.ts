import { UserCreateSchema } from "@/schemas/UserSchemas";
import { fetchApi } from "@/utils/fetch";
import { FormEvent, useState } from "react";

export default function useRegister() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const disabledButtonRegister =
    password != passwordConfirm || !name || !email || !role;

  function register(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const user = {
        name,
        password,
        email,
        role,
      };
      UserCreateSchema.parse(user);
      fetchApi("/api/users/create", {
        body: JSON.stringify(user),
        method: "POST",
      }).then((res) => {
        if (res.error) setError(res.error);
        if (res.message) setSuccess(true);
      });
    } catch (error: any) {
      setError(JSON.parse(error)[0].message);
    }
  }

  function cleanMessages() {
    setError("");
    setSuccess(false);
  }

  return {
    cleanMessages,
    register,
    error,
    setEmail,
    email,
    setName,
    name,
    setPassword,
    password,
    setPasswordConfirm,
    passwordConfirm,
    setRole,
    role,
    success,
    disabledButtonRegister,
  };
}
