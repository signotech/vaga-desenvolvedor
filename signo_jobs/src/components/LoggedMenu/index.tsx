import useLogout from "@/hooks/useLogout";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ModalDeleteUser from "../ModalDeleteUser";
import { User } from "@/interfaces/User";
import { parseCookies } from "nookies";
import { fetchApi } from "@/utils/fetch";
import ModalUserData from "../ModalUserData";

export default function LoggedMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalUserData, setModalUserData] = useState(false);
  const [userInfos, setUserInfos] = useState<User | undefined>();
  const { token } = parseCookies();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleModalUserData = () => setModalUserData(!modalUserData);

  const { logout } = useLogout();

  useEffect(() => {
    token &&
      fetchApi("/api/auth/get_user_infos", {
        method: "GET",
        headers: {
          authorization: token,
        },
      }).then((res: { data: User; message: string }) => {
        res.message && setUserInfos(res.data);
      });
  }, [token]);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Minha Conta</DropdownToggle>
        <DropdownMenu style={{ textAlign: "center" }}>
          <DropdownItem href="/">Inicio</DropdownItem>
          {userInfos && (
            <DropdownItem onClick={toggleModalUserData}>
              Meus Dados
            </DropdownItem>
          )}
          <DropdownItem href="/my_jobs">Minhas Vagas</DropdownItem>
          <DropdownItem divider />
          <DropdownItem color="danger" onClick={logout}>
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {userInfos && (
        <ModalUserData
          toggleModal={toggleModalUserData}
          modal={modalUserData}
          userInfos={userInfos as User}
        />
      )}
    </div>
  );
}
