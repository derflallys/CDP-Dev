import { getSeq } from '../../utils/counter.model'
import {Issue} from "../issue/issue.model";
import {Task} from "../task/task.model";
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

SprintSchema.pre('remove', function(next) {
  Issue.remove({ sprintId: this._id }).exec()
  next()
})

SprintSchema.pre('save', async function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Sprint', st.projectId)
  const res = await seq
  st.sprintId = res
  next()
})


export const Sprint = mongoose.model('Sprint', SprintSchema)
