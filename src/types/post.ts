export enum PostCategory {
  Coding = 'CODING',
  General = 'GENERAL',
}

export interface Post {
  _id: string
  title: string
  contents: string
  category: PostCategory
  writerId?: string
  createdAt: string
  updatedAt: string
}
