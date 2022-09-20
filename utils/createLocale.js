import { prismaClient } from '../pages';
import { v4 as uuidv4 } from 'uuid';
export const createLocale = async (code, type, key, value) => {
  try {
    const typeId = uuidv4();
    const valueId = uuidv4();
    const dataType = {
      U_LOCALE_TYPE_ID: typeId,
      S_LOCALE_ENTITY_TYPE: type,
      S_LOCALE_ENTITY_KEY: key,
    };
    const findLocale = await prismaClient.REG_LOCALES.findMany({
      where: {
        S_LOCALE_CODE: code,
        C_ACTIVE: true,
      },
    });
    const dataValue = {
      U_LOCALE_VALUE_ID: valueId,
      U_LOCALE_ID: findLocale[0].U_LOCALE_ID,
      U_LOCALE_TYPE_ID: typeId,
      S_LOCALE_VALUE: value,
    };
    const createLocaleType = await prismaClient.REG_LOCALE_TYPES.create({ data: dataType });
    const createLocaleValue = await prismaClient.REG_LOCALE_VALUES.create({ data: dataValue });
  } catch (error) {
    console.log('LOCALE ERR', error.message);
  }
};
