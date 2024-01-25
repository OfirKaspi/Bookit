import User from '../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(email: string, password: string): Promise<string | null> {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return null;
        return jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        );
    } catch (err) {
        throw new Error('Failed to login');
    }
}
