require('dotenv').config();
var stripe = require("stripe")("sk_test_Oy5bQHi8b9oHO1eE1cIUX2WN");
const moment = require('moment');
const nodemailer = require('nodemailer');

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

module.exports = {
    checkout: async (req, res) => {
        // const chargeAmt = req.body.amount;
        const charge = await stripe.charges.create({
            amount: req.body.amount, // amount in cents, again
            currency: 'usd',
            source: req.body.token.id,
            description: 'The BBQ Supply Store'
        }, 
        async function (err, charge) {
            //database insert & mail
            // insert into cust_order table
            const db = req.app.get('db')
            const cust_id = req.body.user_id
            const now = moment().format('MM/DD/YY')
            let newCustOrder = await db.cust_order_create({
                cust_id: cust_id,
                order_date: now
            })
            let lineItems = await req.session.cart.map(product => {
                let itemList = db.order_item_create({
                    order_id: newCustOrder[0].order_id,
                    product_id: product.prod_id,
                    prod_price: product.prod_price,
                    quantity: product.quantity
                })    
            })

        // send confirmation e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_ADDRESS,
                pass: EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: EMAIL_ADDRESS,
            to: `${req.session.user.email}`,
            subject: `Order Confirmation from The BBQ Supply Store`,
            // text: `${req.body.message}`,
            html: `${req.body.html_message}`,
            replyTo: EMAIL_ADDRESS
        }
        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                // console.log('here is the res: ', res)
            }
        })
        await req.session.cart.splice(0, req.session.cart.length);


            if (err) return res.sendStatus(500)
            return res.status(200).send(req.session.cart);
            // if (err && err.type === 'StripeCardError') {
            //   // The card has been declined
            // }
        });

        // console.log(req.session)
    },
    getAllStates: (req, res) => {
        const db = req.app.get('db');
        db.states_all().then(response => {
            res.status(200).send(response)
        })
    },

}
