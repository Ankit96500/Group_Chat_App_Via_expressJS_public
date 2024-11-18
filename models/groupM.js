import sequelize from "../config/database.js";
import { DataTypes,Model } from "sequelize";
import User from "./userM.js";

class Group extends Model{
}
    Group.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        gpName:{
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


    export default Group



