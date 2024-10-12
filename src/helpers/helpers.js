const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const expretions = {
    "fullname":/^[a-zA-ZáÁúÚíÍéÉóÓñÑ ]{10,40}$/,
    "email":/^[a-zA-Z0-9.,_-]{5,30}@[a-zA-Z0-9-_]{3,15}\.[a-zA-Z.]{3,10}$/,
    "password":/^.{8,40}$/
}
const checkEmail = (email) => {
    return expretions.email.test(email);
}
const checkPassword = (password) => {
    return expretions.password.test(password);
}
const checkFullname = (fullname) => {
    return expretions.fullname.test(fullname);
}
let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'juandaniel200031@gmail.com',
        pass: 'ynnq slzx ymxj frta'
    }
});
function sendEmail(to, subject, html, result) {
    let mailOptions = {
        from: 'juandaniel200031@gmail.com',
        to,
        subject,
        html
    }
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return result(`Error sending email:${error}`, null);
        }
        result(null, `Email successfully sent:${info.messageId}`);
    });
}
const exists = (objectValues) => {
    const arrayCamps = Object.keys(expretions);
    if(Object.keys(objectValues).length !== arrayCamps.length) return false;
    const campsNotFounds = arrayCamps.filter(camp => !objectValues.hasOwnProperty(camp) && camp);
    return campsNotFounds.length === 0;
}
const checkCamps = (objectValues) => {
    const arrayValues = Object.entries(objectValues).map(([key, value]) => ({key, value}));
    const result = arrayValues.filter(item => !expretions[item.key].test(item.value) && item);
    return { 
        areValid:result.length === 0, 
        invalidCamps:result
    }
}
const getToken = (user, dateExpire=false) => {
    let configToken = {
        exp:Math.floor(Date.now() / 1000) + (60 * 60),
        data:user
    }
    if(!dateExpire) delete configToken.exp;
    const token = jwt.sign(configToken, keys.secretOrKey);
    return token;
}
const decodeToken = (token) => {
    try {
        const decode = jwt.verify(token, keys.secretOrKey);
        return decode.data;
    } catch(err) {
        console.log('Error al decodificar el token');
        console.log(err);
        return false;
    }
}
const order = (array_data) => {
    const result = array_data.sort((a, b) => {
        return a.fullname.localeCompare(b.fullname);
    });
    return result;
}
const extractIdContacts = (contacts) => {
    const result = contacts.map(contact => {
        return contact.idUser;
    });
    return result.flat();
}

module.exports = { 
    exists, 
    checkCamps, 
    getToken, 
    decodeToken, 
    order,
    extractIdContacts,
    sendEmail,
    checkEmail,
    checkFullname,
    checkPassword
}