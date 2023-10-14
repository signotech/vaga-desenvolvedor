import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function useCandidature(id: number) {
  const router = useRouter();
  const { token } = parseCookies();

  function getJob() {
    fetchApi("/api/jobs/candidature/insert", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        authorization: token,
      },
    }).then((res) => {
      if (res.message) router.push("/my_jobs");
    });
  }

  function leaveJob() {
    fetchApi("/api/jobs/candidature/remove", {
      method: "PUT",
      body: JSON.stringify({ id }),
      headers: {
        authorization: token,
      },
    }).then((res) => {
      console.log(res);
      if (res.message) {
        router.route != "/my_jobs" ? router.push("/my_jobs") : router.reload();
      }
    });
  }

  return { getJob, leaveJob, token };
}
