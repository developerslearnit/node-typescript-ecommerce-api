import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const ApiConstants = {
  ApiBaseUrl: '/api/v1',
  ApiKey: '123456',
};

export const guid = () => {
  return uuidv4();
};

export const generateApiKey = async () => {
  var rawGuid = generateId(45);
  var apiKey = await bcrypt.hash(rawGuid, saltRounds);
  return apiKey
    .toString()
    .replaceAll('.', '')
    .replaceAll('$', 'Kc')
    .replaceAll('/', '');
};

export const generateId = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
