import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course-dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = '30c809ef-f2bd-4d02-8d36-bf656dc6d455';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    const expectCreatedTags = [{ id, name: 'nestjs', created_at: date }];
    const expectCreatedCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectCreatedTags,
    };
    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectCreatedCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectCreatedCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectCreatedTags)),
      findOne: jest.fn(),
    };
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDto);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectCreatedCourse).toStrictEqual(newCourse);
  });

  it('should list courses', async () => {
    const expectCreatedTags = [{ id, name: 'nestjs', created_at: date }];
    const expectCreatedCourses = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        created_at: date,
        tags: expectCreatedTags,
      },
    ];

    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectCreatedCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectCreatedCourses)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectCreatedCourses).toStrictEqual(courses);
  });

  it('should find a course', async () => {
    const expectCreatedTags = [{ id, name: 'nestjs', created_at: date }];
    const expectCreatedCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectCreatedTags,
    };

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectCreatedCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);

    expect(expectCreatedCourse).toStrictEqual(course);
  });
});
