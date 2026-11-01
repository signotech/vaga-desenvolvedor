'use strict';

function notFound(req, res) {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Recurso não encontrado.' });
  }

  return res.status(404).render('errors/404', {
    title: 'Página não encontrada',
  });
}

module.exports = notFound;
