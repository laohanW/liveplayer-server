/* eslint-disable no-multi-spaces */
// region import
import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'
// endregion

// region Model definition
let admin = sequelize.define('admin',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'TAdmin',
    timestamp: false
    // freezeTableName: true
  }
)
let user = sequelize.define('user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    account: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'TUser',
    timestamp: false
    // freezeTableName: true
  }
)
let category = sequelize.define('category',
  {
    type: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    recommended: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1
      }
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'TCategory',
    timestamp: false
    // freezeTableName: true
  }
)
let childCategory = sequelize.define('childCategory',
  {
    name: {
      type: Sequelize.STRING
    },
    categoryId: {
      type: Sequelize.INTEGER,
      reference: {
        model: category,
        key: 'id'
      }
    }
  },
  {
    tableName: 'TChildCategory',
    timestamp: false
    // freezeTableName: true
  }
)
let liveStream = sequelize.define('liveStream',
  {
    account: {
      type: Sequelize.STRING
    },
    childCategoryId: {
      type: Sequelize.INTEGER,
      reference: {
        model: childCategory,
        key: 'id'
      }
    }
  },
  {
    tableName: 'TLiveStream',
    timestamp: false
  }
)
// endregion

// region ctor
async function initialize () {
  await admin.sync()
  await user.sync()
  await childCategory.hasMany(liveStream)
  await childCategory.sync()
  await liveStream.sync()
  await category.hasMany(childCategory)
  await category.sync()
}
initialize()
// endregion

// region export
export default {
  category: {
    create: async (query) => {
      sequelize.transaction(async function (t) {
        await category.create(query)
      }).catch(function (err) {
        return err
      })
    },
    update: async (query, option) => {
      sequelize.transaction(async function (t) {
        await category.update(query, option)
      }).catch(function (err) {
        return err
      })
    },
    findAll: async (query) => {
      await category.findAll(query)
    },
    findOne: async (query) => {
      await category.findOne(query, {raw: true, logging: true, plain: false})
    },
    destroy: async (query) => {
      sequelize.transaction(async function (t) {
        await category.destroy(query)
      }).catch(function (err) {
        return err;
      })
    }
  }
}
// endregion
