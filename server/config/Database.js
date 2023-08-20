import {Sequelize} from "sequelize";

const DATABASE_NAME=process.env.DATABASE_NAME || 'sosmed'
const DATABAE_USER=process.env.DATABAE_USER || 'root'
const DATABASE_PW=process.env.DATABASE_PW || 'root'
const DATABASE_HOST=process.env.DATABASE_NAME || 'localhost'

const db=new Sequelize(DATABASE_NAME,DATABAE_USER,DATABASE_PW,{
  host:DATABASE_HOST,
  dialect:'mysql'
})

export default db