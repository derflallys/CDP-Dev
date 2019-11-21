import { getSeq } from '../../utils/counter.model'
const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema(
  {
    sprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sprint'
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    },
    description: {
      type: String,
      required: true,
      maxlength: 750
    },
    issueId: {
      type: Number
    },
    state: {
      type: String,
      required: true,
      enum: ['TODO', 'DOING', 'DONE'],
      default: 'TODO'
    },
    difficulty: {
      type: Number,
      default: 1
    },
    priority: {
      type: String,
      required: true,
      enum: ['HIGH', 'MEDIUM', 'LOW'],
      default: 'LOW'
    }
  },
  { timestamps: true }
)

IssueSchema.pre('save', async function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Issue', st.projectId)
  const res = await seq
  st.issueId = res
  next()
})

export const Issue = mongoose.model('Issue', IssueSchema)
