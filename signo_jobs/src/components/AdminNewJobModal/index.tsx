import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import styles from "./AdminNewJobModal.module.scss";
import { JobCreateSchema } from "@/schemas/JobSchemas";
import { fetchApi } from "@/utils/fetch";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function AdminNewJobModal() {
  const [title, setTitle] = useState<string | undefined>();
  const [salary, setSalary] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => setModal(!modal);
  const { token } = parseCookies();
  const router = useRouter();

  async function createJob() {
    clearMessages();

    const user_id = await fetchApi("/api/auth/get_user_infos", {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => res.data.id);

    try {
      const job = {
        user_id,
        title,
        salary,
        type,
        description,
      };
      JobCreateSchema.parse(job);
      fetchApi("/api/jobs/create", {
        method: "POST",
        body: JSON.stringify(job),
        headers: {
          authorization: token,
        },
      }).then((res) => {
        console.log(res);
        res.message && router.route === "/my_jobs"
          ? router.reload()
          : router.push("/my_jobs");
      });
    } catch (error: any) {
      setError(JSON.parse(error)[0].message);
    }
  }

  function clearMessages() {
    setError("");
  }
  return (
    <>
      <hr />
      <div className={styles.open_button_box}>
        <Button color="danger" onClick={toggle}>
          Cadastrar Nova Vaga!
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Nova Vaga</ModalHeader>
        <ModalBody>
          <form>
            {error && <Alert color="danger">{error}</Alert>}
            <label>
              Titulo*:
              <input
                type="text"
                value={title}
                onFocus={clearMessages}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o titulo da vaga!"
              />
            </label>
            <label>
              Salário (opcional):
              <input
                type="number"
                onFocus={clearMessages}
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                required
                placeholder="Valor do salário!"
              />
            </label>
            <label>
              Tipo de Contratação*:
              <select
                onFocus={clearMessages}
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value={undefined}></option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="FREELANCER">FREELANCER</option>
              </select>
            </label>
            <label>
              Descrição*:
              <textarea
                style={{ height: "300px" }}
                value={description}
                onFocus={clearMessages}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite uma descrição para seu produto!"
              ></textarea>
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            disabled={!title || !type || !description}
            onClick={createJob}
          >
            Cadastrar
          </Button>{" "}
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
