const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema(
  {
    sprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sprint'
    },
    description: {
      type: String,
      required: true,
      maxlength: 750
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

export const Issue = mongoose.model('Issue', IssueSchema)
