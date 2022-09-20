import { prismaClient } from '../prisma/prismaClient';

export const getPaginationList = async (req, tableName, condWhere = {}, localeMap = {}) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const { page, offset, ...filter } = req.query;
  const skip = parseInt(page - 1) * parseInt(offset);
  const searchWhere = Object.keys(filter)
    .map((key) => {
      let obj;
      if (!filter[key]) {
      } else if (regexExp.test(filter[key])) {
        obj = { [key]: filter[key] };
      } else {
        obj = { [key]: { contains: filter[key] } };
      }
      return obj;
    })
    .filter((search) => search);
  const list = await prismaClient.$transaction([
    prismaClient[tableName].findMany({
      skip,
      take: parseInt(offset),
      where: {
        AND: searchWhere,
        ...condWhere,
      },
    }),
    prismaClient[tableName].count({
      where: {
        AND: searchWhere,
        ...condWhere,
      },
    }),
  ]);
  const findLocaleSite = await prismaClient.REG_LOCALES.findMany({
    where: { S_LOCALE_CODE: req.headers['locale'] },
  });
  console.log(findLocaleSite, 'localeEEE');
  let localeList = [];
  for (let item of list[0]) {
    let findLocales = [];
    if (item?.S_LOCALE_ENTITY_TYPE && item?.S_LOCALE_ENTITY_CODE && Object.keys(localeMap).length !== 0) {
      findLocales = await prismaClient.REG_LOCALE_VALUES.findMany({
        where: {
          AND: {
            S_LOCALE_ENTITY_TYPE: item?.S_LOCALE_ENTITY_TYPE,
            S_LOCALE_ENTITY_CODE: item?.S_LOCALE_ENTITY_CODE,
            U_LOCALE_ID: findLocaleSite[0]?.U_LOCALE_ID,
          },
        },
      });
    }

    let localeValues = {};
    Object.keys(localeMap).forEach(function (key, index) {
      const findLocalee = findLocales.find((findLoc) => findLoc?.S_LOCALE_ENTITY_KEY === key);
      if (findLocalee) {
        localeValues[localeMap[key]] = findLocalee?.S_LOCALE_VALUE;
      } else {
        localeValues[localeMap[key]] = `[${req.headers['locale']}_${item?.S_LOCALE_ENTITY_TYPE}_${item?.S_LOCALE_ENTITY_CODE}_${key}] - missing translation`;
      }
    });

    localeList.push({ ...item, ...localeValues });
  }
  // console.log(localeList.map((item) => console.log(item)));
  return {
    page,
    pages: Math.ceil(parseInt(list[1]) / parseInt(offset)),
    list: localeList,
  };
};
