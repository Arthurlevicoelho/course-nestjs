import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/courses.entitiy';
import { Tag } from '../../entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>;

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>;



    async findAll() {
        return this.courseRepository.find({
            relations:['tags'],
        }
        )
    }

    async findOne(id: string) {

        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['tags'],
        })

        if (!course) {
            throw new NotFoundException(`COurse ID ${id} not found`)
        }

        return course;
    }

    async create(createCourseDTO: any) {

        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagByname(name))
        );
        const course = this.courseRepository.create({
            ... createCourseDTO,
            tags,
        });
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCouseDTO: any) {

        const tags = updateCouseDTO.tags && await Promise.all(
            updateCouseDTO.tags.map(name => this.preloadTagByname(name))
        );

        const course = await this.courseRepository.preload({
            ...updateCouseDTO,
            id,
            tags
        });

        if (!course) throw new NotFoundException(`COurse ID ${id} not found`);

        return this.courseRepository.save(course);

    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({
            where: { id },
        });

        if (!course) throw new NotFoundException(`COurse ID ${id} not found`);


        return this.courseRepository.remove(course);
    }

    private async preloadTagByname(name: string): Promise<Tag> {

        const tag = await this.tagRepository.findOne({
            where: { name }
        })
        if (tag) {
            return tag;
        }

        return this.tagRepository.create({ name });
    }
}
