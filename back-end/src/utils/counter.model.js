const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
  type: { type: String, required: true },
  project: { type: String, required: true },
  seq: { type: Number, default: 0 }
})
export const Counters = mongoose.model('counters', CounterSchema)

export const initCounterProject = function initCountProject(projectId) {
  Counters.create({
    type: 'Issue',
    project: projectId,
    seq: 0
  })
  Counters.create({
    type: 'Sprint',
    project: projectId,
    seq: 0
  })
}

export const getSeq = async function getSeq(name, project) {
  const req = await Counters.findOneAndUpdate(
    { type: name, project },
    { $inc: { seq: 1 } },
    { new: true }
  )
    .lean()
    .exec()
  return req.seq
}
