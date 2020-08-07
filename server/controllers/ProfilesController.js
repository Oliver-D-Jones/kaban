import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";


let _endpoint = "profile"
export class ProfilesController extends BaseController {
  constructor() {
    super("api/" + _endpoint);
    this.router
      .get("/:email", this.getKnownProfiles)
      .use(auth0provider.getAuthorizedUserInfo)
      .put("/:email", this.placeInvite)
      .get("", this.getUserProfile)
      .put("/:id", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async getKnownProfiles(req, res, next) {
    console.log(req);
    try {
      let profiles = await profilesService.getProfiles([req]);
      res.send(profiles);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
  async placeInvite(req, res, next) {
    try {

      await profilesService.inviteToBoard(req.body)
    } catch (error) {
      next(error)
    }
  }
}
