const express = require('express');
const Users = require('./models/dbHelpers');
const Books = require('./models/dbHelpers');
const { body, validationResult } = require('express-validator');
const server = express();
const PORT = 3000;

server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello World, from express" });
});

server.post("/users", (req, res) => {


    Users.addUser(req.body)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "Kullanıcı eklenemedi" });
        });

});

server.get("/users", (req, res) => {

    Users.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: "Kullanıcılar görüntülenemedi" });
        });

});
server.get("/users/:id", (req, res) => {
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
server.post("/books", (req, res) => {

    Books.addBook(req.body)
        .then(book => {
            res.status(200).json(book);
        })

});

server.get("/books", (req, res) => {

    Users.getBooks()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json({ message: "Kitaplar görüntülenemedi" });
        });

});
server.get("/books/:id", (req, res) => {
    const { id } = req.params;

    Books.getBook(id)
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


server.post("/users/:u_id/borrow/:b_id", (req, res) => {
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

server.post("/users/:u_id/return/:b_id", (req, res) => {
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
        Users.returnBook(returnB, u_id, b_id)
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




server.listen(PORT, () => {
    console.log('\n*** Server running on http://localhost:${PORT} ***/N');

});