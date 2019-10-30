const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sprint',
    required: true
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
  priority: {
    type: String,
    required: true,
    enum: ['HIGH', 'MEDIUM', 'LOW']
  },
  planification: {
    type: Number
  }
})

module.exports = mongoose.model('Issue', IssueSchema)
