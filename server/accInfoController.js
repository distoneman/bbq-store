module.exports = {
    allOrders: (req, res) => {
        const db = req.app.get('db')
        const user_id = req.params.user_id
        db.acc_all_orders({user_id}).then(response => {
            res.status(200).send(response)
        })
    },
    oneOrder: (req, res) => {
        const db=req.app.get('db');
        const order_id = req.params.order_id;
        db.acc_order_id({order_id}).then(response => {
            res.status(200).send(response)
        })
    }
}