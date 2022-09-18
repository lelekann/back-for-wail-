import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
private readonly users = [
  {
    id: 1,
    username: 'Anna Leleko',
    password: 'some-secure-password',
    role: 'admin'
  },
  {
    id: 2,
    username: 'John Doe',
    password: 'another-secure-password',
    role: 'user'
  }
]

  create(createUserInput: CreateUserInput) {
    const newUser = {
      ...createUserInput,
      role: 'user',
      id: Date.now()
    }
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
