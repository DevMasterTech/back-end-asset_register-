import { Request, Response } from "express";
import { UserService } from '../../services/user/user_service';
import { CreateUserDTO } from "../../DTOs/user/user_register_dto";

const userService = new UserService();

export class UserController {

    //Crear usuarios
    static async register(req: Request, res: Response) {
        try {
            const createUserDto: CreateUserDTO = req.body;
            const newUser = await userService.registerUser(createUserDto);
            res.status(201).json({ message: 'Nuevo usuario creado', newUser })
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}