var stripe = require("stripe")("sk_test_Oy5bQHi8b9oHO1eE1cIUX2WN");

module.exports = {
    payment: async (req, res) => {
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

    },
    getAllStates: (req, res) => {
        const db = req.app.get('db');
        db.states_all().then(response => {
            res.status(200).send(response)
        })
    },
}



// const charge = stripe.charges.create({
//     amount: convertedAmt, // amount in cents, again
//     currency: 'usd',
//     source: req.body.token.id,
//     description: 'Test charge from react app'
//   }, function(err, charge) {
//       if (err) return res.sendStatus(500)
//       return res.sendStatus(200);
//     // if (err && err.type === 'StripeCardError') {
//     //   // The card has been declined
//     // }
//   });