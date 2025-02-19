const server = require('../api/server.js')
const Users = require('../users/users-model.js')
const request = require('supertest')

describe('jokes', function(){
     describe('GET /api/jokes', function(){
          it('should return error without credentials', function(){
               return request(server).get('/api/jokes')
               .then(response => {
                    expect(response.body.Message).toBe("Restricted endpoint. Please provide valid credentials")
               })
          })
     })
})


describe('another jokes test', function(){
     var token = null;

     beforeEach(async () => {
          request(server).post('/api/auth/login').send({username:"username", password:"password"})
          .end(function (err, res){
               token = res.body.token;
          })
     })

     it('should get a valid token', function(){
          
          request(server).get('/api/jokes')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
     })
})



describe('jokes', () => {
   it('requires authorization to get status code 200', () => {
               let loginResponse

               Users.add({username:"user12", password:"kevin"})
               request(server).post('/api/auth/login').send({ username: "user12", password: "kevin"}).then(res => {
               loginResponse = res
               let token = response.token
               
               let authResponse
               let authorization = req.headers.authorization
               return request(server).get('/api/jokes').set({authorization, token}).then(res => {                    
               authResponse = res
               expect(authResponse.status).toEqual(200)
          })
          })
     })
})



