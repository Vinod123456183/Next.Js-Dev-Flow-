import { Schema, model, models, Types, HydratedDocument } from 'mongoose'

export interface IModel {}

const ModelSchema = new Schema<IModel>(
  {},

  {
    timestamps: true,
  }
)

// ModelSchema.index(
//   { provider: 1, providerAccountId: 1 },
//   { unique: true }
// )

// ModelSchema.index({ userId: 1, provider: 1 }, { unique: true })

const Model = models.Model || model<IModel>('Model', ModelSchema)

export default Model
