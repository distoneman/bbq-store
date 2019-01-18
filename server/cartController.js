module.exports = {
    addItem: async (req, res) => {
        if (req.session.cart) {
            console.log('cart exists')
            const index = req.session.cart.findIndex(prod => prod.prod_id == req.body.prod_id)
            console.log(index)
            if (index === -1) {
                req.session.cart.push({ prod_id: req.body.prod_id, quantity: req.body.quantity })
            } else {
                let updatedQty = Number(req.session.cart[index].quantity) + Number(req.body.quantity);
                req.session.cart[index].quantity = updatedQty;
            }
        } else {
            req.session.cart = []
            req.session.cart.push({ prod_id: req.body.prod_id, quantity: req.body.quantity })
        }
        res.status(200).send(req.session.cart)
    },
    getSession: async (req, res) => {
        res.status(200).send(req.session);
    }
}