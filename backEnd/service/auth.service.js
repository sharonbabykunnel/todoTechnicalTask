import { AuthenticationError, ConflictError, NotFoundError } from "../utils/errorHandler.js";
import * as Auth from '../repository/auth.repository.js';
import token from '../utils/jwt.js';

export const handleLogin = async (email, password)=>{
    const user = await Auth.findByEmail(email);
    if (!user) {
        throw new NotFoundError('Email is not exists');
    }

    const checkPassword = await Auth.verifyPassword(password, user.password);
    if (!checkPassword) {
        throw new AuthenticationError('Incorrect password.')
    }

    const accessToken = token(user._id);

    return {
        user: {
            _id: user._id,
            name: user.name,
            email:user.email
        },
        accessToken
    }
}

export const handleRegister = async (name, email, password, number) => {
    const checkUser = await Auth.findByEmail(email);
    if (checkUser) {
        throw new ConflictError('User already exists');
    }

    //cheking whether the number is present database
    const checkNumber = await Auth.findByNumber(number);
    if (checkNumber) {
        throw new ConflictError(`User already exist with this number`);
    }

    const user = await Auth.createUser(name, email, password, number);

    const accessToken = token(user._id);

    return {
        user:{
        id: user._id,
        name: user.name,
        email: user.email
        },
        accessToken
    }
}

export const handlePasswordChange = async (email, password) => {
    const user = await Auth.findByEmail(email);
    if (!user) {
        throw new NotFoundError('Invalid email');
    }

    const updatedUser = await Auth.changePassword(user, password);
    
    return updatedUser
}