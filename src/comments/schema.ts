import {
  findCommentById,
  createComment,
  getAllComments,
  subscribeCommentCreated,
} from './manager'
import { IComment, IDocComment } from './models'
import { findUserById } from '../users/manager'
import { findPostById } from '../posts/manager'

interface AddCommentParams {
  text: string
  ownerId: string
  postId: string
}

interface IdParam {
  id: string
}

interface PostIdParam {
  postId: string
}

export interface CommentMutation {
  addComment(args: AddCommentParams): IComment
}

export interface CommentQuery {
  comment(args: IdParam): IComment
  comments: IComment[]
}

export interface CommentSubscription {
  commentAdded(args: PostIdParam): IComment
}

export const resolver = {
  Mutation: {
    addComment(parentValue: any, args: any) {
      return createComment(args)
    },
  },
  Query: {
    comment(parentValue: any, args: any) {
      return findCommentById(args.id)
    },
    comments() {
      return getAllComments()
    },
  },

  Subscription: {
    commentAdded: {
      subscribe: (postId: string) => subscribeCommentCreated(postId),
    },
  },

  IComment: {
    owner(comment: IDocComment) {
      return findUserById(comment.ownerId)
    },
    post(comment: IDocComment) {
      return findPostById(comment.postId)
    },
  },
}
