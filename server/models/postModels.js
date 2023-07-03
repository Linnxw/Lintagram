import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import User from "./userModels.js"
const {DataTypes} = Sequelize

 const Post = db.define('post',{
  title:{
    type:DataTypes.STRING
  },
  url:{
    type:DataTypes.TEXT
  },
  path:{
    type:DataTypes.STRING
  },
  userId:{
    type:DataTypes.INTEGER
  }
},{
  freezeTableName:true
})

User.hasMany(Post);
Post.belongsTo(User,{foreignKey:'userId'});

export default Post;