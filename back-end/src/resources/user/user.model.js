const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema(
  {
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
    userName: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 20
    }
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator)

UserSchema.path('email').validate(function(email) {
  var emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email.text) // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

export const User = mongoose.model('User', UserSchema)
