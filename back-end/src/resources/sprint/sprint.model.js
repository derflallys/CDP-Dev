import { getSeq } from '../../utils/counter.model'
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
  },
  release: {
    type: String,
    maxlength: 150
  }
})

SprintSchema.pre('save', async function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Sprint', st.projectId)
  const res = await seq
  st.sprintId = res
  next()
})

SprintSchema.path('release').validate(function(value) {
  // Match URLs that end with ".git"
  const URL_REGEX = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})\/?([\w .-]*)*(\.git)$/g
  return value.match(URL_REGEX)
}, 'Given release URL is not a valid URL.')

export const Sprint = mongoose.model('Sprint', SprintSchema)
