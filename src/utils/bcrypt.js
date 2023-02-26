import brcypt from 'bcrypt'


export const hashPassword = async (password) => {
    const salt = await brcypt.genSaltSync(10)
    return brcypt.hashSync(password, salt)
}

export const comparePassword = (plain, password) => {
    return brcypt.compareSync(plain, password)
}