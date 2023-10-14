import { Job } from "@/interfaces/Job";
import { JobCreateSchema } from "@/schemas/JobSchemas";
import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

function EditJobModal(props: Omit<Job, "candidates" | "status" | "user_id">) {
  const { id } = props;
  const [title, setTitle] = useState<string | undefined>();
  const [salary, setSalary] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => setModal(!modal);
  const { token } = parseCookies();
  const router = useRouter();

  async function editJob() {
    clearMessages();

    const user_id = await fetchApi("/api/auth/get_user_infos", {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => res.data.id);

    try {
      const job = {
        id,
        user_id,
        title,
        salary,
        type,
        description,
      };
      JobCreateSchema.parse(job);
      fetchApi("/api/jobs/update", {
        method: "PUT",
        body: JSON.stringify(job),
        headers: {
          authorization: token,
        },
      }).then((res) => res.message && router.reload());
    } catch (error: any) {
      setError(JSON.parse(error)[0].message);
    }
  }

  function clearMessages() {
    setError("");
  }
  function initialSet() {
    setTitle(props.title);
    setSalary(props.salary);
    setDescription(props.description);
    setType(props.type);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initialSet, []);

  return (
    <div>
      <AiFillEdit onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
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
          <Button color="success" onClick={editJob}>
            Editar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditJobModal;
