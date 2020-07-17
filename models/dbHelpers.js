//kneq queryleri bu dosuada yazacağız.


//Db dosyası nerede olduğunu bilmesi için knex file ile ilişkilendirmemiz gerekiyor.
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
module.exports = {
    addUser, getUsers, getUser, addBook, getBook, getBooks,
    addBorrowBook, returnBook, getStatus, getUserHistory
};


//ekle, bul,güncelle,....

async function addUser(user) {
    const [id] = await db("users").insert(user);
    return id;
}
async function addBook(book) {
    const [id] = await db("books").insert(book);
    return id;
}

function getUsers() {

    return db("users");
}
function getUser(id) {
    return db("users").where({ id }).first();
}
function getUserHistory(b_id) {
    return db("borrow_book").join('books', 'b_id', '=', 'books.id').join('users', 'b_id', '=', 'users.id')
        .where({ b_id: b_id }).select('title', 'name', "status");

}

function getBooks() {
    return db("books");
}
function getBook(id) {

    return db("books").where({ id }).first();
}
function getStatus(b_id) {
    return db("borrow_book").where({ b_id }).andWhere({ status: 1 }).first();
}

async function addBorrowBook(borrowB, u_id, b_id) {

    const [id] = await db("borrow_book")
        .where({ b_id: b_id })
        .andWhere({ u_id: u_id })
        .insert({ u_id: u_id, b_id: b_id, status: 1 });

    return getBook(b_id)
}


function returnBook(returnB, u_id, b_id, status) {

    return db("borrow_book")
        .where({ b_id: b_id })
        .andWhere({ u_id: u_id })
        .update({ status: 0 });
}