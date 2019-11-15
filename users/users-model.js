const db = require('../database/dbConfig.js')

module.exports = {
     add,
     getAll,
     findByUser,
     getById
}

function add(newUser){
     return db('users').insert(newUser, "id").then(([id]) => getById(id))
}

function getAll(){
     return db('users')
}

function getById(id){
     return db('users').where('id','=',id).first()
}

function findByUser(username){
     return db('users').where('username','=', username).first()
}