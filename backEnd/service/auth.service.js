import { AuthenticationError, NotFoundError } from "../utils/errorHandler";

export const handleLogin = async (email, password)=>{
    const checkEmail = await Auth.findByEmail(email);
    if (!checkEmail) {
        throw new NotFoundError('Email is not exists');
    }

    const checkPassword = await Atuh.checkPassword(password);
    if (!checkPassword) {
        throw new AuthenticationError('Incorrect password.')
    }

    

}