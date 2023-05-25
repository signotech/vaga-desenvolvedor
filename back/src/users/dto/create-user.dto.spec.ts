import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  let createUserDto: CreateUserDto;

  beforeEach(() => {
    createUserDto = new CreateUserDto();
  });

  describe('Properties', () => {
    it('should have the nome property', () => {
      createUserDto.nome = 'John Doe';
      expect(createUserDto.nome).toBe('John Doe');
    });

    it('should have the email property', () => {
      createUserDto.email = 'johndoe@example.com';
      expect(createUserDto.email).toBe('johndoe@example.com');
    });

    it('should have the telefone property', () => {
      createUserDto.telefone = '123456789';
      expect(createUserDto.telefone).toBe('123456789');
    });

    it('should have the tipoContrato property', () => {
      createUserDto.tipoContrato = 'CLT';
      expect(createUserDto.tipoContrato).toBe('CLT');
    });

    it('should have the password property', () => {
      createUserDto.password = 'password123';
      expect(createUserDto.password).toBe('password123');
    });

    it('should have the appliedJobs property', () => {
      createUserDto.appliedJobs = ['jobId1', 'jobId2'];
      expect(createUserDto.appliedJobs).toEqual(['jobId1', 'jobId2']);
    });
  });

});
