import User from "../models/user.js";
import bcrypt from 'bcryptjs'

///getting all users
export const getAllUser = async (req, res, next) => {

    let users;
    try {
        users = await User.find()
    } catch (error) {
        console.log(error)
    }

    //if no user found
    if (!users) {
        return res.status(404).json({ message: "no user found" })
    }

    //user found return it
    return res.status(200).json({ users })

}

///creating new  user

export const signup = async (req, res, next) => {

    const { name, email, password } = req.body;

    //finding if user already exist or not
    let existingUser

    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    if (existingUser) {
        return res.status(400).json({ message: "user already exist" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    //if not avaiable
    //creating new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    })
    // const hashedPassword = bcrypt.hashSync(password)

    try {
        await user.save();
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).json({ user })
}

//logging user
export const login = async (req, res, next) => {

    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    //user not found
    if (!existingUser) {
        return res.status(404).json({ message: "user not found" })
    }

    //compare method is given by bcyrpt
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)


    //checking if password is wrong
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "incorrect password" })
    }

    return res.status(200).json({ message: "Login successfully" })
}