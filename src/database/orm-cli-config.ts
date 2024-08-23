import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1724017788429 } from "src/migrations/1724017788429-CreateCoursesTable";
import { CreateTagsTable1724024517203 } from "src/migrations/1724024517203-CreateTagsTable";
import { CreateCoursesTagsTable1724027034893 } from "src/migrations/1724027034893-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1724027800071 } from "src/migrations/1724027800071-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1724029824520 } from "src/migrations/1724029824520-AddTagsIdToCoursesTagsTable";
import { Course } from "src/courses/entities/courses.entitiy";
import { Tag } from "src/courses/entities/tags.entity";


export const dataSourceOptions: DataSourceOptions ={
    type:'postgres',
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    entities:[Course,Tag],
    synchronize:false,
}

export const dataSource = new DataSource({
    ... dataSourceOptions,
    synchronize:false,
    migrations: [CreateCoursesTable1724017788429,
        CreateTagsTable1724024517203,
        CreateCoursesTagsTable1724027034893,
        AddCoursesIdToCoursesTagsTable1724027800071,
        AddTagsIdToCoursesTagsTable1724029824520],
})