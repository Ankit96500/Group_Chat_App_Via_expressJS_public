import sequelize from "../config/database.js";
import { DataTypes,Model } from "sequelize";
import Group from "./groupM.js";

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
        GroupID:{
            type:DataTypes.INTEGER,
            references:{
                model:Group,
                key:"id",
            }
        }

    },{
        freezeTableName:true,sequelize
    })







    export default Chat



