import { AppDataSource } from '../config/databaseConfig.js';
import {Users} from '../dist/models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




const userRepository = AppDataSource.getRepository(Users);



//funcion para registrar un usuario
export const register = async (req, res)=>{
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
    const user = userRepository.create({
        name: username,
        password: hashedPassword
    });
    await userRepository.save(user);
    res.status(201).json({message: 'User created'});
    }catch{
        //se podria hacer un mejor manejo de errores mas especifico
        res.status(409).json({message: 'User already exists'});
    }
}
//funcion para loguear un usuario y regresar un token
export const login = async (req, res)=>{
    const {username, password} = req.body;
    const user = await userRepository.findOne({
        where: {name: username}
    });
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({message: 'invalid credentials'});
    }
    const token = jwt.sign({
        userId: user.id,
        username: user.name
    }, 'secretoseguro', {expiresIn: '1h'});
    res.status(200).json({token:token});
}