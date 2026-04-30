import { Sequelize } from 'sequelize-typescript';
// import { addAuditableHooks } from 'src/models/auditable.helpers';
import { Employee } from 'src/infrastructure/database/models/employee.model';
import { Role } from './models/security/role.model';
import { User } from './models/security/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: () => {
      const sequelize = new Sequelize({
        dialect: 'postgres', // o 'mysql'
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'leonardo1*',
        database: 'my_local_db',
        logging: false,
        models: [Employee, Role, User], // Agrega tus modelos aquí
      });

      return sequelize;
    },
  },
];
