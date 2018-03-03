/**
 * Created by yanglei on 2018/2/24.
 */
const BaseModel = require('./BaseModel')

class UserAuthModel extends BaseModel{
    constructor (db, Schema) {
        const schema = new Schema({
            account: String,
            pwd: String
        })
        super(db, schema, 'userAuth')
    }

    async add (authObj) {
        let authInfo = await this.find(authObj.account)
        if (!authInfo || authInfo.length === 0) {
            return new this.model(authObj).save()
        }
    }

    async del (account) {
        let authInfo = await this.find(account)
        return await this.delById(authInfo._id)
    }

    async find (account) {
        return this.model.find({account: account})
    }
}

module.exports = UserAuthModel
