import { readFileSync } from 'fs';
import { join } from 'path';
import { User } from './users.types';

// Resolves to backend/data.json from both src/users and dist/users
const DATA_PATH = join(__dirname, '..', '..', 'data.json');

export function loadUsersFromDisk(): User[] {
  return JSON.parse(readFileSync(DATA_PATH, 'utf8')) as User[];
}

// Stands in for a database: UsersModule constructs it once with the contents
// of data.json, and tests construct it with fixtures.
export class UsersRepository {
  private readonly users: Map<string, User>;

  constructor(users: User[]) {
    this.users = new Map(users.map((user) => [user.id, user]));
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }
}
