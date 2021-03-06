import { getSeq } from '../../utils/counter.model'
import {IssueSchema} from "../issue/issue.model";
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    issues: [Number],
    dependencies: [Number],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
      required: true
    },
    sprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sprint',
      required: true
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
      maxlength: 250
    },
    state: {
      type: String,
      required: true,
      enum: ['TODO', 'DOING', 'DONE'],
      default: 'TODO'
    },
    toTest: {
      type: Boolean,
      default: true
    },
    toDoc: {
      type: Boolean,
      default: true
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

TaskSchema.pre('deleteOne', function(next) {
    console.log("pre remove task")
    //Task.remove({ sprintId: this._id }).exec()
    next()
})

TaskSchema.pre('save', async function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Task', st.projectId)
  const res = await seq
  st.taskId = res
  next()
})

export const Task = mongoose.model('Task', TaskSchema)
