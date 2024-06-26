import bcryptjs from 'bcryptjs'
import User from '../model/user.model.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'




export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        if (
            [username, email, password].some((fields) => fields?.trim() === "")
        ) {
            throw new Error(400, "All fields are required")
        }
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            res
                .status(401)
                .json("username already exist")
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res
            .status(200)
            .json("User created successfully")


    } catch (error) {
        next(error)
        // res
        //     .status(500)
        //     .json(error.message)
    }

}

export const signin = async (req, res, next) => {

    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))
        // console.log(validUser)
        const validPassword = await bcryptjs.compare(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials'))
        // console.log(validPassword)

        const token = jwt.sign(
            {
                id: validUser._id
            },
            process.env.JWT_SECRET,
        )
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10)

            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc
            res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error)
    }
}


export const signOut = async(req, res, next) =>{
    try {
        res.clearCookie('access_token')
        res.status(200).json('User has been logged out')
    } catch (error) {
        next(error)
    }
}