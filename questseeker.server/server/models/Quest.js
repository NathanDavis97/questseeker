import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Quest = new Schema(
  {
    hostId: { type: String, required: true },
    accessCode: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isJoinable: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    creatorId: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Quest.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Quest
