import sqlite3 from 'sqlite3'

let models = {}

models.db = new sqlite3.Database(':memory:', (err) => {
    if(err)
    {
        return console.error(err.message)
    }
    console.log("Connected to the in-memory sqlite database")
})


models.db.serialize(() => {
    models.db
        .run('CREATE TABLE people(first_name text, last_name text)')
        .run(`INSERT INTO people(first_name, last_name)
              VALUES ("Kyle", "Thayer"),
                     ("Kyle", "Chandler"),
                     ("Miranda", "Ma"),
                     ("Jared", "Lim")
        
        `)
    
        .run('CREATE TABLE secret_table(message text)')
        .run(`INSERT INTO secret_table(message)
              VALUES ('The password for Kyle is: pa55w0rd'),
                     ('The treasure is hidden on the 5th floor.')
         
        `)
})

export default models