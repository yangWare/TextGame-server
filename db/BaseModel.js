/**
 * Created by yanglei on 2018/2/24.
 */
class BaseModel {
    constructor (db, schema, dbName) {
        this.model = db.model(dbName, schema)
    }

    async add (modelObj) {
        return new this.model(modelObj).save()
    }

    async findById (_id) {
        return this.model.find({_id: _id})
    }

    async delById (_id) {
        return this.model.remove(_id)
    }

    async updateById (modelObj) {
        return this.model.update({_id: modelObj._id}, modelObj)
    }
}

module.exports = BaseModel