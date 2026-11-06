CREATE TABLE IF NOT EXISTS vagas (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    tipo ENUM('CLT', 'PJ', 'Freelancer') NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    local_trabalho VARCHAR(150) NOT NULL,
    status ENUM('Aberta', 'Pausada') NOT NULL DEFAULT 'Aberta',
    criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS candidatos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY email (email),
    UNIQUE KEY cpf (cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS inscricoes (
    id INT NOT NULL AUTO_INCREMENT,
    candidato_id INT NOT NULL,
    vaga_id INT NOT NULL,
    data_inscricao TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'Em anlise',
    PRIMARY KEY (id),
    UNIQUE KEY uq_candidato_vaga (candidato_id, vaga_id),
    KEY fk_inscricao_vaga (vaga_id),
    CONSTRAINT fk_inscricao_candidato
        FOREIGN KEY (candidato_id)
        REFERENCES candidatos (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_inscricao_vaga
        FOREIGN KEY (vaga_id)
        REFERENCES vagas (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
