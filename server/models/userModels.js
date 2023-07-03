import db from "../config/Database.js";
import {Sequelize} from "sequelize";

const {DataTypes} = Sequelize

const User=db.define('user',{
  name:{
    type:DataTypes.STRING,
  },
  email:{
    type:DataTypes.STRING,
    validate:{
      isEmail:true
    }
  },
  password:{
    type:DataTypes.STRING,
  },
  role:{
    type:DataTypes.STRING
  },
  refresh_token:{
    type:DataTypes.TEXT,
  }
},{
  freezeTableName:true
})

export default User;
