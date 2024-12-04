import asyncHandler from "../middlewares/asyncHandler.js";
import * as auth from '../service/auth.service.js';

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken } = await auth.handleLogin(email, password);
    res.status(200).json({ success: true, messge: `Logginded Successfull.`, user, accessToken });
});

export const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const { user, accessToken } = await auth.handleRegister(name, email, password);
    res.staus(200).json({ success: true, message: `Successfully Registered`, user, accessToken });
});

export const setNewPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    await auth.handlePasswordChange(email, password);
    res.status(200).json({ success: true, message: `Passowrd changed successfully` });
});

export const logout = (req, res) => {
    res.status(200).json({ success: true, message: 'User logged out' });
}