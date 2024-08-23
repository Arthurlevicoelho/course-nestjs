import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entitiy';
import { CourseService } from './services/course/course.service';
import { Tag } from './entities/tags.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag])],
    controllers:[CoursesController],
    providers:[CourseService],
})
export class CoursesModule {}
