const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
})
export const counter = mongoose.model('counters', CounterSchema)

const SprintSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  sprintId: {
    type: Number
  },
  title: {
    type: String,
    required: true,
    maxlength: 150
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
})
async function getSeq(name) {
  const req = await counter
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { new: true })
    .lean()
    .exec()
  return req.seq
}
SprintSchema.pre('save', function(next) {
  console.log('pre save ')
  const st = this
  const seq = getSeq('Sprint')
  // eslint-disable-next-line promise/catch-or-return,no-return-assign
  seq.then(res => {
    st.sprintId = res
    next()
  })
})
export const Sprint = mongoose.model('Sprint', SprintSchema)
