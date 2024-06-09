## Employee Dashboard TL

This employee management application streamlines HR operations by providing a responsive dashboard for managing employee records, including features to view, add, edit, and delete employees with robust data validation.

### Getting Started

1. Run `npm install` in the root directory of the project. 

2. Set the `DATABASE_URL` in the .env file to point to your postgres database. Refer to .env.sample as an example. 

3. Run `npx prisma db push` to push the initial schema to the database. 

4. Run `npm run seed` to seed existing database. 

5. Run `npm run dev` and navigate to `http://localhost:3000`




### Continued Development

For changes to the db schema, refer to [Prisma Documentation](https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema).

