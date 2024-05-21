import { Request, Response } from 'express';
import User from '../models/user';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';



export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    await user.destroy();
    res.json({
      msg: `Usuario eliminado con exito. Id: ${id}`
    });
  } else {
    res.status(404).json({
      msg: `No existe un usuario con el id: ${id}`
    })
  }
}

export const register = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (!user) {

      await User.create(req.body);
      res.json({
        msg: 'Usuario agregado con exito.'
      });

    } else {
      console.log('Email o Username no disponibles');
      res.status(400).json({ msg: 'Email o Username no disponibles' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al agregar un usuario' });
  }
}

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user && user.password === password) {
      const token = jwt.sign({ id: user.id }, 'jcKey', { expiresIn: '1h' }); // Genera un token

      res.json({ token: token });

    } else {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
  } catch {
    console.error(Error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}

export const getUser = async (req: Request, res: Response) => {

  const { token } = req.body;

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'your-secret-key');
    const userId = (decoded as any).id;

    // Buscar al usuario en la base de datos
    const user = await User.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
}