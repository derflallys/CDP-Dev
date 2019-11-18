import { createCounterProjet, getSeq } from '../../utils/counter.model'
const mongoose = require('mongoose')

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
  state: {
    type: String,
    enum: ['To Start', 'In progress', 'Completed'],
    default: 'To Start'
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

SprintSchema.pre('save', function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Sprint', st.projectId)
  return seq.then(res => {
    st.sprintId = res
    next()
  })
})
export const Sprint = mongoose.model('Sprint', SprintSchema)
