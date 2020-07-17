const express = require('express');
const Users = require('../models/dbHelpers');
const router = express.Router();
const { body, validationResult } = require('express-validator');



router.post("/", [body('title').isString(),
body('author').isLength({ min: 3 }),
body('desc').isString(),

], (req, res, next) => {
    try {
        validationResult(req).throw();

        Users.addBook(req.body)
            .then(book => {
                res.status(200).json(book);
            })
    } catch (err) {
        res.status(422).json("Girdiğiniz bilgiler hatalıdır lütfen kontrole ediniz")
    }


});

router.get("/", (req, res) => {

    Users.getBooks()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json({ message: "Kitaplar görüntülenemedi" });
        });

});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Users.getBook(id)
        .then(book => {

            if (book) {
                res.status(200).json(book)
            }
            else {
                res.status(404).json({ message: "Kitap bulunamadı" });

            }
        })
        .catch(error => {
            res.status(500).json({ message: "Kitap getirme Operasyonu yapılamadı" });
        });

});

module.exports = router;