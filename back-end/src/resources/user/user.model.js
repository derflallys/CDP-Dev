import bcrypt from 'bcryptjs'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema(
  {
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
    userName: {
      type: String,
      required: true,
      maxlength: 20
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
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}, 'The e-mail field cannot be empty.')

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

UserSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

export const User = mongoose.model('User', UserSchema)
