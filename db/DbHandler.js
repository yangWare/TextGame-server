/**
 * Created by yanglei on 2018/2/24.
 */
const mongoose = require('mongoose')
const UserAuthModel = require('./UserAuthModel')
const UserModel = require('./UserModel')

async function DbHandlerFactory () {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1/TextGame')
        const Schema = mongoose.Schema

        const userAuthModel = new UserAuthModel(db, Schema)
        const userModel = new UserModel(db, Schema)

        return {
            userAuthModel,
            userModel
        }
    } catch (e) {
        console.log(e)
        return {}
    }
}

module.exports = DbHandlerFactory
