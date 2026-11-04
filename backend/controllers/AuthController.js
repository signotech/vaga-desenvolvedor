class AuthController {
  constructor(service) {
    this.service = service;
  }

  login = async (req, res) => res.json(await this.service.login(req.body.email, req.body.senha));
}

module.exports = AuthController;
