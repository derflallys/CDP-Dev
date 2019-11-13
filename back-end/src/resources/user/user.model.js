import { getSeq } from '../../utils/counter.model'
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    issueId: {
      type: Number
    },
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
export const User = mongoose.model('User', UserSchema)
