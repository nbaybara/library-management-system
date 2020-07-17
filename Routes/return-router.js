const express = require('express');
const Users = require('../models/dbHelpers');
const router = express.Router();


router.post("/users/:u_id/return/:b_id", (req, res) => {
    const { u_id } = req.params;
    const { b_id } = req.params;
    const { status } = req.params
    const returnB = req.body;

    if (!returnB.user_id) {
        returnB["u_id"] = parseInt(u_id, 10)
        returnB["b_id"] = parseInt(b_id, 10)
    }

    Users.getBook(b_id).then(book => {
        if (!book) {
            res.status(404).json({ message: "Kitap bulunamadı." })
        }
    })


    Users.getUser(u_id).then(user => {
        if (!user) {
            res.status(404).json({ message: "Kullanıcı bulunamadı!" });
        }
        Users.returnBook(returnB, u_id, b_id, status)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(500).json({ message: "Bilgileri kontrol et" })
                }
            }).catch(err => {
                res.status(500).json({ message: "İadede sıkıntı yaşandı" });
            });

    }).catch(error => {
        res.status(500).json({ message: "Error return book" });
    });
});
module.exports = router;