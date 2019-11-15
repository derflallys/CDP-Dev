import { getSeq } from '../../utils/counter.model'
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
    userName: {
      type: String,
      required: true,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      maxlength: 30
    },
    password: {
      type: String,
      required: true,
      maxlength: 20
    }
  },
  { timestamps: true }
)

UserSchema.pre('save', function(next) {
  console.log('pre save ')
  const st = this
  const seq = getSeq('User')
  return seq.then(res => {
    st.UserId = res
    next()
  })
})

UserSchema.path('email').validate(function(email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email.text) // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

export const User = mongoose.model('User', UserSchema)
