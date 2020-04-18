import Shortid from 'shortid';

export const playerInitialState = {
  id: '',
  name: '',
  isRegistered: false,
};

export const playerReducer = (player, action) => {
  switch (action.type) {
    case 'generateUniqueID':
      return { ...player, id: Shortid.generate() };

    case 'registerToRoom': {
      return { ...player, name: action.name, isRegistered: true };
    }
    default:
      throw new Error('Unexpected Error!');
  }
};
