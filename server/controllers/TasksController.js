import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { tasksService } from '../services/TasksService'


let _endpoint = "tasks"
//PUBLIC
export class TasksController extends BaseController {
  constructor() {
    super("api/" + _endpoint)
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      // comment routes \/
      .post('/:id/comments', this.createComment)
      .put('/:taskId/comments/:commentId', this.editCommentBody)
      .delete('/:taskId/comments/:commentId', this.deleteComment)
  }


  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await tasksService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await tasksService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await tasksService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }


  // creates a comment "subdoc" refrencing the tasks id
  async createComment(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      res.send(await tasksService.createComment(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  // edits a comment "subdoc" refrencing the parent task's id and the comment id aswell
  async editCommentBody(req, res, next) {
    try {
      res.send(await tasksService.editCommentBody(req.params.taskId, req.params.commentId, req.body))
    } catch (error) {
      next(error)
    }
  }
  // Delets a comment refrencing the task id and the comment id
  async deleteComment(req, res, next) {
    try {
      await tasksService.deleteComment(req.params.taskId, req.params.commentId)
      res.send("deleted comment")
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await tasksService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await tasksService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}