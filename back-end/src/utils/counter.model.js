const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
})
export const Counters = mongoose.model('counters', CounterSchema)
const initDataSprint = new Counters({ _id: 'Sprint', seq: 0 })
const initDataIssue = new Counters({ _id: 'Issue', seq: 0 })
Counters.findOne({ _id: 'Sprint' }, function(err, count) {
  if (!count) {
    Counters.create(initDataSprint, function(error) {
      console.log(error)
    })
  }
})
Counters.findOne({ _id: 'Issue' }, function(err, count) {
  if (!count) {
    Counters.create(initDataIssue, function(error) {
      console.log(error)
    })
  }
})

export const getSeq = async function getSeq(name) {
  const req = await Counters.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true }
  )
    .lean()
    .exec()
  return req.seq
}
