import { Schema, model, models, Types, HydratedDocument } from 'mongoose'

export interface IAnswer {
  // and here we havent write Schema.Types.ObjectId
  author: Types.ObjectId
  question: Types.ObjectId
  content: string
  upvotes: number
  downvotes: number
}

const AnswerSchema = new Schema<IAnswer>(
  {
    // here we combine two different schema , to get industry standards , so we used Schema.Types.ObjectId

    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    content: { type: String, reqired: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },

  {
    timestamps: true,
  }
)

// AnswerSchema.index(
//   { provider: 1, providerAccountId: 1 },
//   { unique: true }
// )

// AnswerSchema.index({ userId: 1, provider: 1 }, { unique: true })

const Answer = models.Answer || model<IAnswer>('Answer', AnswerSchema)

export default Answer
