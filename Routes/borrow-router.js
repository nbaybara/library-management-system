const express = require('express');
const Users = require('../models/dbHelpers');
const router = express.Router();

router.post("/users/:u_id/borrow/:b_id", (req, res) => {
    const { u_id } = req.params;
    const { b_id } = req.params;
    const borrowB = req.body;
    if (!borrowB.user_id) {
        borrowB["u_id"] = parseInt(u_id, 10)
        borrowB["b_id"] = parseInt(b_id, 10)
    }
    Users.getStatus(b_id).then(book => {
        if (book) {
            res.status(404).json({ message: "Kitap  başkası tarafında ödünç alınmış" });
        }
    })
    Users.getUser(u_id).then(user => {
        if (!user) {
            res.status(404).json({ message: "Kullanıcı bulunamadı!(borrowbook)" });
        }

        //addBorrowBook fonksiyonu return ediyordu!
        Users.addBorrowBook(borrowB, u_id, b_id)
            .then(message => {
                if (message) {
                    res.status(200).json(message);
                }
            }).catch(error => {
                res.status(500).json({ message: "Kitap ödünç alınamadı" });

            });
    }).catch(error => {
        res.status(500).json({ message: "Error borrowinf book" });
    });
});

module.exports = router;