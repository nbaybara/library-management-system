// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/library.db3'
    },
    useNullAsDefault: true
  },

  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);

    }
  },
  migrations: {
    tableName: 'knex_migrations'
  },


};
