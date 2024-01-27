import User from '../../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function loginUser(email: string, password: string): Promise<string | null> {
    try {
        const user = await User.findOne({ email })
        if (!user) throw new Error('Cannot find user')

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) throw new Error('Cannot find user')

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        )

        return token
    } catch (err) {
        throw new Error('Failed to login')
    }
}
