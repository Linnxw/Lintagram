import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import User from "./userModels.js"
const {DataTypes} = Sequelize

 const Profile = db.define('profile',{
  me:{
    type:DataTypes.TEXT
  },
  url:{
    type:DataTypes.TEXT
  },
  image:{
    type:DataTypes.STRING
  },
  userId:{
    type:DataTypes.INTEGER
  }
},{
  freezeTableName:true
})

User.hasOne(Profile,{foreignKey:"userId"});
Profile.belongsTo(User,{foreignKey:'userId'});

export default Profile;

