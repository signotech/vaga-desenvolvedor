'use strict';

/**
 * Encapsula handlers assíncronos, encaminhando rejeições para o
 * middleware de erro do Express.
 */
function asyncHandler(handler) {
  return (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);
}

module.exports = asyncHandler;
