
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.text('name', 128).notNullable();


    })
        .createTable('books', table => {
            table.increments();
            table.string('title', 128).notNullable();
            table.string('author', 128).notNullable();
            table.string('desc', 128)
            table.integer('score');

            //Kitap ödünç tarihi verilmişse kullanılabilir.
            //table.timestamps(true, true)

        })
        .createTable('borrow_book', table => {
            //foreign key user ve books tabloları ile ilişkilendirdim.
            //sqlite'ta boolean olmd için integer ile 0 ve 1 olarak kitabın iade edilip edilmediğini kontrol ediyoruz. 
            table.integer('status');
            table.integer('u_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            table.integer('b_id').unsigned().notNullable().references('id').inTable('books').onDelete('CASCADE').onUpdate('CASCADE');

        })

};

exports.down = function (knex) {
    return knex.schema.
        dropTableIfExists("users").dropTableIfExists("books").dropTableIfExists("borrow_book")
};
