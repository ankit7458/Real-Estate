import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashpassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashpassword});
    try {
        await newUser.save();
        res.status(201).json("user created Succefull!")
    } catch (error) {
        next(error);
    }



};   