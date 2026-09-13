import { Schema, model, models } from 'mongoose'

export interface ITag {
  name: string
  questions: number
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },

  {
    timestamps: true,
  }
)

// TagSchema.index(
//   { provider: 1, providerAccountId: 1 },
//   { unique: true }
// )

// TagSchema.index({ userId: 1, provider: 1 }, { unique: true })

const Tag = models.Tag || model<ITag>('Tag', TagSchema)

export default Tag
