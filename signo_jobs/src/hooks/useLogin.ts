import { AuthLoginSchema } from "@/schemas/AuthSchemas";
import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { FormEvent, useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function login(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const loginInfos = { email, password };
      AuthLoginSchema.parse(loginInfos);
      fetchApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfos),
      }).then((res) => {
        if (res.error) setError(res.error);
        if (res.message) manageLoginCookie(res.data.token);
      });
    } catch (error: any) {
      setError(JSON.parse(error)[0].message);
    }
  }

  function manageLoginCookie(responseToken: string) {
    const { token } = parseCookies();
    if (token) destroyCookie(null, "token");

    setCookie(null, "token", responseToken, {
      maxAge: 8 * 60 * 60,
      path: "/",
    });
    router.push("/");
  }

  function cleanMessages() {
    setError("");
  }

  return {
    cleanMessages,
    setEmail,
    email,
    setPassword,
    password,
    error,
    login,
  };
}
