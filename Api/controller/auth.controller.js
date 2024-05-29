import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashpassword });
    try {
        await newUser.save();
        res.status(201).json("user created Succefull!")
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const [email, password] = req.body;
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong credential'));
        const token = jwt.sign({id:validUser_id}, process.env.JWT_SECRET);
        res.cookie('access_token',token, {httpOnly:true}).status(200).json(validUser);
        
    } catch (error) {
        next(error);
    }

};