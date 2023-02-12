import bcrypt from 'bcrypt'

const saltRound = 10
class auth {
    constructor() {}

    // hashing Password
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(saltRound)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    }

    comparePassword(password, hash) {
        const compare = bcrypt.compareSync(password, hash)
        return compare
    }

}

export { auth }