import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

export default function useLogout() {
  const router = useRouter();

  function logout() {
    destroyCookie(null, "token");
    router.route == "/" ? router.reload() : router.push("/");
  }

  return { logout };
}
