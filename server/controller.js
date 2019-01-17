const bcrypt = require('bcryptjs');

module.exports = {
    getProdCategory: (req, res) => {
        const db = req.app.get('db')
        const catid = req.params.catid
        // console.log(req.params.catid)
        db.product_category({catid}).then(response => {
        //   console.log(response)
            res.status(200).send(response)
        })
    },
    // getProdBrand: (req, res) => {
    //     const db = req.app.get('db')
    //     db.product_brand({brandid}).then(response => {
    //         res.status(200).send(response)
    //     })
    // },
    getOneProduct: (req, res) => {
        const db = req.app.get('db')
        const prodid = req.params.prodid
        db.product_id({prodid}).then(response => {
            res.status(200).send(response)
        })
    },
    

}