import { define } from 'typeorm-seeding';

import { RoleType } from '../../constants';
import { UserEntity } from '../../modules/user/entities/user.entity';

define(UserEntity, (faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName);
  const phone = faker.phone.phoneNumber();

  const user = new UserEntity();

  return user;
});
