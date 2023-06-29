import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
   {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      surname: {
        type: String,
        required: true
      }
   }
);

export default model('User', UserSchema);


/* const User = model('User', UserSchema);

const users = [
  { id: 1, name: 'user 1', surname: 'surname 1' },
  { id: 2, name: 'user 2', surname: 'surname 2' },
  { id: 3, name: 'user 3', surname: 'surname 3' },
  { id: 4, name: 'user 4', surname: 'surname 4' },
  { id: 5, name: 'user 5', surname: 'surname 5' }
];
User.deleteMany({});
User.insertMany(users)
  .then(() => {
    console.log('users guardados exitosamente en la base de datos');
  })
  .catch((error) => {
    console.error('Error al guardar users en la base de datos: ', error);
  }); */