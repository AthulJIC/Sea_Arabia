import {Linking} from 'react-native';

export const generateAppUrl = (screenName, params) => {
  const url = Linking.createURL({
    routeName: screenName,
    params,
  });

  return url;
};
