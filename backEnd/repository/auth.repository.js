import User from '../models/user.model.js';
import bcrypt from 'bcrypt'; 

export const findByEmail = async (email) => {
    return await User.findOne({ email });
}

export const findByNumber = async (number) => {
    return await User.findOne({ number });
}

export const createUser = async (name, email, password, number) => {
    return await User.create({ name, email, password, number });
}

export const verifyPassword = async (inputPassword, password) => {
    return await bcrypt.compare(inputPassword, password)
}

export const changePassword = async (user, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.save();
    return user;
}