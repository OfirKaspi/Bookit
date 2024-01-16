import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs'
import { UserType } from "../shared/types"

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = model<UserType>('User', userSchema)

export default User