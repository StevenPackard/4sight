import express from "express";
import BaseController from "../utils/BaseController";
import { tasksService } from "../services/TasksService";
import auth0provider from "@bcwdev/auth0provider";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .put("/:id", this.edit)
      .post("", this.create)
      .put("/:id/comments", this.createComment)
      .delete("/:id", this.delete)
      .put("/:id/comments/:commentId", this.deleteComment)
      .put("/:id/comments/:commentId/comment", this.editComment);
  }
  async getAll(req, res, next) {
    try {
      let data = await tasksService.find(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await tasksService.findById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id;
      let data = await tasksService.edit(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await tasksService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async createComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await tasksService.createComment(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(req, res, next) {
    try {
      await tasksService.deleteComment(req.body);
      return res.send("comment deleted");
    } catch (error) {
      next(error);
    }
  }
  async editComment(req, res, next) {
    try {
      let data = await tasksService.editComment(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await tasksService.delete(req.params.id);
      return res.send("task deleted");
    } catch (error) {
      next(error);
    }
  }
}
