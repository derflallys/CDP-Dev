import { getSeq } from '../../utils/counter.model'
import { IssueSchema } from '../issue/issue.model'
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    issues: [IssueSchema],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    },
    sprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sprint'
    },
    dev: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    taskId: {
      type: Number
    },
    dod: {
      type: String,
      required: true,
      maxlength: 100
    },
    state: {
      type: String,
      required: true,
      enum: ['TODO', 'DOING', 'DONE'],
      default: 'TODO'
    },
    toTest: {
      type: Boolean,
      default: false
    },
    toDoc: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

TaskSchema.pre('save', async function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Task', st.projectId)
  const res = await seq
  st.taskId = res
  next()
})

export const Task = mongoose.model('Task', TaskSchema)
