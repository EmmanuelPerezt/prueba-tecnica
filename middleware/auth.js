import jwt from 'jsonwebtoken';




const authMiddleware = (req, res, next) => {
    // obtnemos el token del header
    const header = req.header('Authorization');
    if(!header){
        return res.status(401).json({message: 'Acceso denegado'});
    }
    try {
        //quitamos el 'Bearer' del token
        const token = header.split(' ')[1];
        //el secreto del token esta harcodeado para afectos practicos pero deberia estar en una variable de entorno
        //y ser mucho mas complejo
        const decode = jwt.verify(token, 'secretoseguro');
        req.user = decode.username;
        next();
    } catch (error) {
        res.status(400).json({message: 'token no valido'});
    }
}

export default authMiddleware;