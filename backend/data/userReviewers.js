import bcrypt from 'bcryptjs';
const userReviews = [
  {
    name: 'Sue Perd',
    email: 'sue@mail.com',
    password: bcrypt.hashSync('Deputi55', 10),
  },
  {
    name: 'Too Strong',
    email: 'too@mail.com',
    password: bcrypt.hashSync('Deputi55', 10),
  },
  {
    name: 'Peta Bread',
    email: 'peta@mail.com',
    password: bcrypt.hashSync('Deputi55', 10),
  },
];
export default userReviews;
