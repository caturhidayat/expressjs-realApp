import { userService } from "../services/userService.js";

const UserService = new userService();

class userController {
    // constructor(req, res) {
    //     (req = this.req), (req = this.res);
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
    signIn(req, res) {
        UserService.signIn(req, res)
    }
    signInPage(req, res) {
        UserService.signInPage(req, res)
    }
    signUpPage(req, res) {
        UserService.signUpPage(req, res)
    }

    logout(req, res) {
        UserService.logout(req, res)
    }
} 

export { userController };
