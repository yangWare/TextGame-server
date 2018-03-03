/**
 * Created by yanglei on 2018/2/24.
 */
const BaseModel = require('./BaseModel')

class UserModel extends BaseModel {
    constructor (db, Schema) {
        const schema = new Schema({
            _id: Object,
            nickName: String,
            level: Number,
            exp: Number
        }, {
            _id: false
        })
        super(db, schema, 'userInfo')
    }
}

module.exports = UserModel