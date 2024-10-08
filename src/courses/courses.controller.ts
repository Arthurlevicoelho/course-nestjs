import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
  } from '@nestjs/common'
  import { CourseService } from './services/course/course.service'
  import { CreateCourseDTO } from './entities/dtos/create-courses.dto'
  import { UpdateCourseDTO } from './entities/dtos/update-course.dto'
  
  @Controller('courses')
  export class CoursesController {
    constructor(private readonly courseService: CourseService) {}
  
    @Get()
    findAll() {
      return this.courseService.findAll()
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.courseService.findOne(id)
    }
  
    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO) {
      return this.courseService.create(createCourseDTO)
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO) {
      return this.courseService.update(id, updateCourseDTO)
    }
  
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.courseService.remove(id)
    }
  }