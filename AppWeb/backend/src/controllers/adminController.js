const admModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config(); 

function calcularTempoRestante(expiracao) {
  const dataAtual = Math.floor(Date.now() / 1000);
  const tempoRestante = expiracao - dataAtual;
  return tempoRestante; // Retorna o tempo restante em segundos
}
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const adm = await admModel.existAdm(email);
    

    if (adm) {
      const senhaCorrespondente = await bcrypt.compare(senha, adm.senha);

      if (senhaCorrespondente) {
        // Senha correta, gerar o token JWT
        const token = jwt.sign({ email: adm.id }, process.env.JWT_SECRET, { expiresIn: 10 * 60 });

       
        const expiracao = Math.floor(Date.now() / 1000) + 3600; // Obtém a expiração em segundos
        const tempoRestante = calcularTempoRestante(expiracao);
        return res.status(200).json({ message: 'Login válido', token: token, expiracao: expiracao, tempoRestante: tempoRestante });

        // return res.status(200).json({ message: 'Login válido', token: token });
      } else {
        // Senha incorreta, login inválido
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }
    } else {
      // Email ou senha estão incorretos, login inválido
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};



const addAdm = async (req, res) => {
  try {

    const { nome, email, senha, confirmarsenha } = req.body;
    
    const admExistente = await admModel.existAdm(email);
    if (admExistente) {
      return res.status(400).json({ error: 'O email já está cadastrado' });
    }

    const saltRounds = 10;
    const senhacriptografada = await bcrypt.hash(senha, saltRounds);
    const senhacriptografada2 = await bcrypt.hash(confirmarsenha, saltRounds);
    const novoAdm = await admModel.addAdm({ nome, email, senha: senhacriptografada, confirmarsenha: senhacriptografada2});

    return res.status(201).json(novoAdm);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAdmById = async (req, res) => {
  try {
    const { id } = req.params;
    const adm = await admModel.getAdmById(id);

    if (adm) {
      // Criando um novo objeto sem a propriedade senha e confirmarsenha antes de retornar
      const admSemSenha = { ...adm.dataValues };
      delete admSemSenha.senha;
      delete admSemSenha.confirmarsenha;

      return res.status(200).json(admSemSenha);
    } else {
      return res.status(404).json({ message: 'Adm não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




module.exports = {
  login,
  addAdm,
  getAdmById
};


