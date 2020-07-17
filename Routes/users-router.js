const express = require('express');
const Users = require('../models/dbHelpers');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post("/", [body('name').isString()],
    (req, res, next) => {
        try {
            validationResult(req).throw();
            Users.addUser(req.body)
                .then(user => {
                    res.status(200).json(user);
                })

        } catch (err) {
            res.status(422).json("Girdileri kontrol edip tekrar deneyin")
        }

    });

//history raw ve tek satır döndürüyor düzeltiplip getUser'a eklenecek
router.get("/history/:id", (req, res) => {
    const { id } = req.params;
    Users.getUserHistory(id)
        .then(userh => {
            if (userh) {
                res.status(200).json(userh);
            }
            else {
                res.status(500).json({ message: "Geçmiş bulunamadı" });
            }
        })


});
router.get("/", (req, res) => {

    Users.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: "Kullanıcılar görüntülenemedi" });
        });

});
router.get("/:id", (req, res) => {
    const { id } = req.params;


    Users.getUser(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({ message: "kullanıcı bulunamadı" });

            }
        })
        .catch(error => {
            res.status(500).json({ message: "Kullanıcı getirme Operasyonu yapılamadı" });
        });

});

module.exports = router;