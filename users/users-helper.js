module.exports = validateUser

function validateUser(user){
     let errors = []

     if(!user.username || user.username < 2){
          errors.push("Please provide a valid username")
     }
     if(!user.password || user.password < 4){
          errors.push("Please provide a valid password")
     }
     return{
          isSuccessful: errors.length > 0 ? false : true,
          errors
     }
}