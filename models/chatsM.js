import sequelize from "../config/database.js";
import { DataTypes,Model } from "sequelize";
import User from "./userM.js";

class Chat extends Model{
}
    Chat.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        usChat:{
            type:DataTypes.STRING
        },
        username:{
            type:DataTypes.STRING
        },
        UserID:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:"id",
            }
        }

    },{
        freezeTableName:true,sequelize
    })

    export default Chat



