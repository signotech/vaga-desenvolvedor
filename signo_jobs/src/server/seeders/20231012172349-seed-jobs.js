"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "jobs",
      [
        {
          id: 1,
          user_id: 1,
          title: "Desenvolvedor Front-End",
          description: "Vaga para desenvolvimento com NextJS, NodeJS, CSS",
          salary: "2500",
          type: "CLT",
          status: "JOB",
          candidates: ["2"],
        },
        {
          id: 2,
          user_id: 1,
          title: "Desenvolvedor Front-End Angular",
          description: "Vaga para desenvolvimento com Angular, CSS",
          salary: "2700",
          type: "CLT",
          status: "JOB",
        },
        {
          id: 3,
          user_id: 4,
          title: "Desenvolvedor Front-End Freelancer",
          description:
            "Preciso de um desenvolvedor freelancer que procura desenvolver suas habilidades.",
          salary: "700",
          type: "FREELANCER",
          status: "JOB",
          candidates: ["2"],
        },
        {
          id: 4,
          user_id: 4,
          title: "Desenvolvedor Front-End PJ",
          description: "Vaga para desenvolvimento com NextJS, NodeJS, CSS",
          salary: "2500",
          type: "PJ",
          status: "JOB",
        },
        {
          id: 5,
          user_id: 1,
          title: "Desenvolvedor Front-End Freelancer",
          description:
            "Vaga para desenvolvimento de plataforma com Python e Angular",
          salary: "500",
          type: "FREELANCER",
          status: "PAUSED",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("jobs", null, {});
  },
};
