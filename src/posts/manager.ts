import { IDocPost, PostModel } from './models'
import { save, findModel, findModelById } from '../db/adapter'

interface IPostParams {
  title: string
  text: string
  ownerId: string
}

function createPost(params: IPostParams) {
  return save(new PostModel(params))
}

function findPostById(id: string) {
  return findModelById(PostModel, id)
}

function getAllPosts() {
  return findModel(PostModel, {})
}

export { createPost, findPostById, getAllPosts }
