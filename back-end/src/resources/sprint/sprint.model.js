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
export const Sprint = mongoose.model('Sprint', SprintSchema)

SprintSchema.pre('save', function(next) {
  console.log('pre save ')
  const st = this
  console.log(st)
  counter.findOneAndUpdate(
    {
      _id: 'Sprint',
      update: { $inc: { seq: 1 } },
      new: true
    },
    function(error, count) {
      if (error) return next(error)
      console.log(count.seq)
      st.sprintId = count.seq
    }
  )
})
