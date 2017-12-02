import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

sequelize.define('TAnchor',
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
  }
)
