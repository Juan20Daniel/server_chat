const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Users = {}
Users.getUser = async (email) => {
    try {
        const user = await User.findOne({email});
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el usuario.');
    }
}
Users.getUsers = async () => {
    try {
        const result = await User.find();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('No se logro consultar los usuarios.');
    }
}
Users.createUser = async (newUser) => {
    try {
        const { fullname, email, password } = newUser; 
        const salt = bcrypt.genSaltSync();
        var hash = bcrypt.hashSync(password, salt);
        const data = {
            fullname,
            email,
            password:hash
        }
        const user = new User(data);
        const result = await user.save();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
Users.updateUser = async (uid, user) => {
    try {
        let newUser = await User.findByIdAndUpdate(uid, user, {new:true});
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = Users;