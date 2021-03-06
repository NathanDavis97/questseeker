import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Answer = new Schema(
  {
    objectiveId: { type: String, ref: 'Objective', required: true },
    body: { type: String, required: true },
    creatorId: { type: String, required: true },
    isSubmitted: { type: Boolean },
    isCorrect: { type: Boolean },
    img: { type: String }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Answer.virtual('objective', {
  localField: 'objectiveId',
  ref: 'Objective',
  foreignField: '_id',
  justOne: true
})
Answer.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Answer
