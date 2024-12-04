import JWT from 'jsonwebtoken';

const accessToken = (uid) => {
    return JWT.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

export default accessToken;