const Sequelize = require('sequelize')


const DB_NAME = 'nodejstodo'
const USER_NAME = "root"
const PASSWORD = "p%$78sY22G9x"

const sequelize = new Sequelize(DB_NAME,USER_NAME,PASSWORD,{
    host:'localhost',
    dialect:'mysql'
})


module.exports = sequelize