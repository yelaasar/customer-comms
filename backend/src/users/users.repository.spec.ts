import { loadUsersFromDisk, UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  const repository = new UsersRepository(loadUsersFromDisk());

  it('finds a user from data.json by id', () => {
    const user = repository.findById('ff535484-6880-4653-b06e-89983ecf4ed5');
    expect(user?.firstName).toBe('Kayleigh');
    expect(user?.cats).toHaveLength(3);
  });

  it('returns undefined for an unknown id', () => {
    expect(repository.findById('unknown')).toBeUndefined();
  });
});
