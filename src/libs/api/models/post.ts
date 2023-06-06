import { PostCategory } from '@/types/post'
import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: String,
  category: {
    type: String,
    enum: PostCategory,
    default: PostCategory.General,
  },
  writerId: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

export const PostModel = mongoose.models.Post || mongoose.model('Post', PostSchema)
