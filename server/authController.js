const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {firstname, lastname, email, password} = req.body;
        const db = req.app.get('db');
        const custArr = await db.cust_find_email({email:email})
        if(custArr.length >= 1) {
            return res.status(200).send({message: "Email already in use.", inUse: true})
        } 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newCust = await db.cust_create({
            firstname: firstname,
            lastname: lastname,
            email: email, 
            hash: hash
        });
        req.session.user = {
            id: newCust[0].cust_id,
            firstname: newCust[0].cust_firstname,
            lastname: newCust[0].cust_lastname,
            email: newCust[0].acc_email
        }
        // req.session.user = {
        //     id: 5,
        //     firstname: 'Dianne',
        //     lastname: 'Stoneman',
        //     email: 'newCust[0].acc_email'
        // }
        res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})
    },
}