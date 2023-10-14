import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import LoginModal from "../LoginModal";
import { parseCookies } from "nookies";
import LoggedMenu from "../LoggedMenu";
import Link from "next/link";

export default function Header() {
  const { token } = parseCookies();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  useEffect(() => {
    token && setIsLogged(true);
  }, [token]);
  return (
    <header>
      <div className={styles.header + " container"}>
        <Link href={"/"} className={styles.header_logo}>
          <Image src="/favicon.ico" alt="logo" width={40} height={40} />
          <h1 className="text-white">Signo Jobs</h1>
        </Link>

        {!isLogged && <LoginModal />}
        {isLogged && <LoggedMenu />}
      </div>
      <hr className="container" />
    </header>
  );
}
