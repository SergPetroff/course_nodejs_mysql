const Sequelize = require('sequelize')

const seauelize = require('../utils/database')

const todo = seauelize.define('Todo',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type:Sequelize.INTEGER,
    },
    done:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    title:Sequelize.STRING
    // date:{
    //     type:Sequelize.DATE,
    //     allowNull:false
    // }
})


module.exports = todo