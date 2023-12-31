import {Sequelize} from "sequelize";

const DATABASE_NAME=process.env.DATABASE_NAME || 'sosmed'
const DATABASE_USER=process.env.DATABASE_USER || 'root'
const DATABASE_PW=process.env.DATABASE_PW || 'root'
const DATABASE_HOST=process.env.DATABASE_HOST || 'localhost'

const db=new Sequelize(DATABASE_NAME,DATABASE_USER,DATABASE_PW,{
  host:DATABASE_HOST,
  dialect:'mysql'
})

export default db