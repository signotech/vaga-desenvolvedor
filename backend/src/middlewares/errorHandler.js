function errorHandler(err, _req, res, _next) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Registro duplicado', details: err.errors?.map((e) => e.message) });
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(409).json({
      error: 'Não é possível excluir: existem registros relacionados',
    });
  }
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Validação falhou', details: err.errors?.map((e) => e.message) });
  }
  console.error(err);
  return res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
}

module.exports = errorHandler;
