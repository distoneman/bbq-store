var stripe = require("stripe")("sk_test_Oy5bQHi8b9oHO1eE1cIUX2WN");
const moment = require('moment');

module.exports = {
    checkout: async (req, res) => {
        // const chargeAmt = req.body.amount;
        const charge = stripe.charges.create({
            amount: req.body.amount, // amount in cents, again
            currency: 'usd',
            source: req.body.token.id,
            description: 'Test charge from react app'
        }, function (err, charge) {
            //database insert & mail
            if (err) return res.sendStatus(500)
            return res.sendStatus(200);
            // if (err && err.type === 'StripeCardError') {
            //   // The card has been declined
            // }
        });
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
        // let newOrderItems = await db.order_item_create({
        //     order_id: newCustOrder.order_id,
        //     product_id:
        // })

        // console.log(newCustOrder.order_id)
        // console.log(req.session.cart)
    },
    getAllStates: (req, res) => {
        const db = req.app.get('db');
        db.states_all().then(response => {
            res.status(200).send(response)
        })
    },

}
