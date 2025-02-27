//para capturar errores

export const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    res.status(500).json({
      message: err.message || 'Algo salió mal, por favor intente más tarde.',
    });
  };