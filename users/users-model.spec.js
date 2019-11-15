const db = require('../database/dbConfig.js')
const Users = require('./users-model.js')
const request = require('supertest')
const server = require('../api/server.js')

describe('users model', function(){
     describe('add()', function(){
          beforeEach(async () => {
               await db('users').truncate()
          })

          it('should insert a new user', async function(){
               await Users.add({ username: "kevin", password: "kevin"})
               const allUsers = await db('users')

               expect(allUsers).toHaveLength(1)
               expect(allUsers[0].username).toBe("kevin")
          })

          it('should return inserted user', async function(){
               const gabe = await Users.add({ username: "gabe", password: "gabe"})
               const returningUser = await db('users')

               expect(gabe.id).toBe(1)
               expect(gabe.id).toBeDefined()
               expect(returningUser).toHaveLength(1)
          })
     })

     describe('findByUser()', function(){
          beforeEach(async () => {
               await db('users').truncate();
          })

          it('returns the username Kevin once inserted', async function(){
               await Users.add({ username:"kevin", password: "kevin111"})
               const returningUser = await Users.findByUser("kevin")

               expect(returningUser).toBeDefined()
               expect(returningUser.username).toBe('kevin')
               expect(returningUser.password).toBe('kevin111')
          })

          it('Should not login without credentials', async function(){
               return request(server).post('/api/auth/login')
               .then(response => {
                    expect(response.body.message).toMatch(/Please provide valid username and password/i)
               })
          })
     })
})