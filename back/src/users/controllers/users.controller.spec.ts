import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', () => {
    const createUserDto: CreateUserDto = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      telefone: '123456789',
      tipoContrato: 'CLT',
      password: 'password',
      appliedJobs: [],
    };

    const createdUser = {}; 

    jest.spyOn(service, 'create').mockResolvedValue(createdUser);

    expect(controller.create(createUserDto)).resolves.toBe(createdUser);
  });

  it('should get all users', () => {
    const filters = {};
    const sort = 'nome';
    const page = 1;
    const limit = 20;

    const users = []; 

    jest.spyOn(service, 'findAll').mockResolvedValue(users);

    expect(controller.findAll(filters, sort, page, limit)).resolves.toBe(users);
  });

  it('should get a user by ID', () => {
    const userId = '123';

    const user = {}; 

    jest.spyOn(service, 'findOne').mockResolvedValue(user);

    expect(controller.findOne(userId)).resolves.toBe(user);
  });

  it('should update a user', () => {
    const userId = '123';
    const updateUserDto: UpdateUserDto = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      telefone: '123456789',
      tipoContrato: 'CLT',
      password: 'newpassword',
      appliedJobs: [],
    };

    const updatedUser = {}; 

    jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

    expect(controller.update(userId, updateUserDto)).resolves.toBe(updatedUser);
  });


});
