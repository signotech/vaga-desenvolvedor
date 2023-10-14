import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListJobs from "@/components/ListJobs";
import PageLoading from "@/components/PageLoading";
import useUserJobsManager from "@/hooks/useUserJobsManager";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const {
    token,
    loading,
    fetchFirstUserInfos,
    jobs,
    userJobs,
    role,
    qtyPages,
    setPage,
    page,
    setSearch,
    search,
    setOrderBy,
    orderBy,
    setItemsPerPage,
    itemsPerPage,
  } = useUserJobsManager();
  const router = useRouter();

  useEffect(() => {
    !token && router.push("/");
    token && fetchFirstUserInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, itemsPerPage, orderBy, token, search]);

  return (
    <>
      <Head>
        <title>SignoTech - Jobs</title>
        <meta
          name="description"
          content="Sua plataforma de vagas online, encontre já sua vaga."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container">
        {loading && <PageLoading />}
        {!loading && (
          <ListJobs
            title={"Minhas Vagas"}
            setSearch={setSearch}
            search={search}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            jobs={jobs}
            userJobs={userJobs}
            role={role}
            setPage={setPage}
            page={page}
            qtyPages={qtyPages}
            setItemsPerPage={setItemsPerPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
