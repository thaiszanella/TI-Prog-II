function autorizar(...tipos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Não autenticado" });
    }

    if (!tipos.includes(req.usuario.tipo)) {
      return res.status(403).json({
        erro: "Permissão insuficiente",
        necessario: tipos,
        atual: req.usuario.tipo,
      });
    }

    next();
  };
}

module.exports = autorizar;
