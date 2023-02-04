import { userService } from "../services/userService.js";
import express from 'express'

const UserService = new userService();

class userController {
    // constructor(req, res) {
    //     this.req = req,
    //     this.res = res
    // }

    getAll(req, res) {
        UserService.getAllUser(req, res);
    }
    getSingle(req, res) {
        const id = req.params.id;
        UserService.getSingleUser(+id, req, res);
    }
    create(req, res) {
        const body = req.body;
        UserService.createUser(body, req, res);
    }
    update(req, res) {
        const id = req.params.id;
        const body = req.body;
        UserService.updateUser(+id, body, req, res);
    }
    delete(req, res) {
        const id = req.params.id;
        UserService.deleteUser(+id, res);
    }


    // Sign in
    login(req, res) {
        UserService.login(req, res)
    }
    loginPage(req, res) {
        UserService.loginPage(req, res)
    }
    signUpPage(req, res) {
        UserService.signUpPage(req, res)
    }

    logout(req, res) {
        UserService.logout(req, res)
    }

    // Profile
    profile(req, res) {
        UserService.profile(req, res)
    }
} 

export { userController };
