import { userService } from "../services/userService.js";

const UserService = new userService();

class userController {
    constructor(req, res) {
        (req = this.req), (req = this.res);
    }

    getAll(req, res) {
        UserService.getAllUser(req, res);
    }
    getSingle(req, res) {
        const id = req.params.id;
        UserService.getSingleUser(+id, req, res);
    }
    create(req, res) {
        const body = req.body;
        UserService.createUser(body, res);
    }
    update(req, res) {
        const id = req.params.id;
        UserService.updateUser(+id, res);
    }
    delete(req, res) {
        const id = req.params.id;
        UserService.deleteUser(+id, res);
    }
}

export { userController };
