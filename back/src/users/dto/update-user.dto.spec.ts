import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from './update-user.dto';

describe('UpdateUserDto', () => {
  let updateUserDto: UpdateUserDto;

  beforeEach(() => {
    updateUserDto = new UpdateUserDto();
  });

  describe('Properties', () => {
    it('should have the nome property', () => {
      updateUserDto.nome = 'John Doe';
      expect(updateUserDto.nome).toBe('John Doe');
    });

    it('should have the email property', () => {
      updateUserDto.email = 'johndoe@example.com';
      expect(updateUserDto.email).toBe('johndoe@example.com');
    });

    it('should have the telefone property', () => {
      updateUserDto.telefone = '123456789';
      expect(updateUserDto.telefone).toBe('123456789');
    });

    it('should have the tipoContrato property', () => {
      updateUserDto.tipoContrato = 'CLT';
      expect(updateUserDto.tipoContrato).toBe('CLT');
    });

    it('should have the password property', () => {
      updateUserDto.password = 'password123';
      expect(updateUserDto.password).toBe('password123');
    });

    it('should have the appliedJobs property', () => {
      updateUserDto.appliedJobs = ['jobId1', 'jobId2'];
      expect(updateUserDto.appliedJobs).toEqual(['jobId1', 'jobId2']);
    });
  });

});
