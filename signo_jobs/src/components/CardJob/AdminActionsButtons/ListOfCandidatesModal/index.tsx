import { Job } from "@/interfaces/Job";
import { User } from "@/interfaces/User";
import { fetchApi } from "@/utils/fetch";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ListOfCandidatesModal(props: Pick<Job, "title" | "candidates">) {
  const [modal, setModal] = useState(false);
  const [usersJob, setUsersJob] = useState([]);
  const { title, candidates } = props;
  const { token } = parseCookies();

  const toggle = () => setModal(!modal);

  function getCandidates() {
    fetchApi("/api/users/by_jobs", {
      method: "POST",
      body: JSON.stringify({ candidates }),
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.message) {
          setUsersJob(res.data);
        }
      })
      .finally(toggle);
  }

  return (
    <div>
      <FaUsers color="blue" onClick={getCandidates} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {usersJob.length > 0 ? (
            usersJob.map((candidate: User, index: number) => (
              <div key={candidate.id}>
                <hr style={{ border: "1px solid black" }} />
                <p className="text-center">
                  {index + 1} - {candidate.name} - {candidate.email}
                </p>
                <hr style={{ border: "1px solid black" }} />
              </div>
            ))
          ) : (
            <h1 className="text-center">Nenhum candidato inscrito ainda!</h1>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ListOfCandidatesModal;
