import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'


let _endpoint = "lists"
//PUBLIC
export class ListsController extends BaseController {
  constructor() {
    super("api/" + _endpoint)
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getChildren)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }
  // api.put('lists/' + taskData.listId + "/tasks")

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await listsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await listsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getChildren(req, res, next) {
    console.log("LC getChildren", req);
    try {
      let data = await tasksService.getByParentId(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    console.log(req);
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }


  async delete(req, res, next) {
    try {
      await listsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}