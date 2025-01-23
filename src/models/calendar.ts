import { DataTypes, Model, Sequelize } from "sequelize";
import { CalendarData } from "../interfaces/calendar.interface";

class Calendar extends Model<CalendarData> implements CalendarData
{
    public id!: number;
    public invitationId!: number;
    public order!: number;
    public calendar!: boolean;
    public dDay!: boolean;
    public countdown!: boolean;

    static initialize(sequelize: Sequelize) {
        Calendar.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                invitationId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'invitations',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',  
                    onDelete: 'CASCADE',
                },
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                calendar: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                dDay: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                countdown: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'calendars',
                timestamps: true,
            }
        )
    }
}

export default Calendar;