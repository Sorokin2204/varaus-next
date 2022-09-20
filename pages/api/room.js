import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';
import NextCors from 'nextjs-cors';
export default async function handle(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteFirm(req.body?.deleteId);
      res.json(resault);
    } else {
      const resault = await createFirm(req.body);
      res.json(resault);
    }
  } else if (req.method === 'PATCH') {
    const resault = await updateFirm(req.body);
    res.json(resault);
  } else if (req.method === 'GET') {
    const resault = await getFirm(req.query?.id);
    res.json(resault);
  }
}

const createFirm = async ({ name, slug, price, country, quantityBeds, quantityPeoples, area, shortDesc, fullDesc, imgPrev, imgBanner }) => {
  const data = {
    ID: uuidv4(),
    NAME: name,
    SLUG: slug,
    PRICE: price,
    COUNTRY: country?.value,
    COUNT_BEDS: quantityBeds?.value,
    COUNT_CUSTOMER: quantityPeoples?.value,
    AREA: area,
    SHORT_DESC: shortDesc,
    FULL_DESC: fullDesc,
    IMG_PREV: imgPrev,
    IMG_BANNER: imgBanner,
  };
  const createFirm = await prismaClient.ROOMS.create({ data: data });
  return createFirm;
};

const updateFirm = async ({ name, slug, price, country, quantityBeds, quantityPeoples, area, shortDesc, fullDesc, id, imgPrev, imgBanner }) => {
  console.log(imgPrev);
  console.log(imgBanner);
  const data = {
    NAME: name,
    SLUG: slug,
    PRICE: price,
    COUNTRY: country?.value,
    COUNT_BEDS: quantityBeds?.value,
    COUNT_CUSTOMER: quantityPeoples?.value,
    AREA: area,
    SHORT_DESC: shortDesc,
    FULL_DESC: fullDesc,
    IMG_PREV: imgPrev,
    IMG_BANNER: imgBanner,
  };
  const updateFirm = await prismaClient.ROOMS.updateMany({
    where: {
      ID: id,
    },
    data: data,
  });
  return updateFirm;
};
const deleteFirm = async (id) => {
  const deleteFirm = await prismaClient.ROOMS.delete({
    where: {
      U_ID: id,
    },
  });
  return deleteFirm;
};
const getFirm = async (slug) => {
  const getFirm = await prismaClient.ROOMS.findMany({
    where: {
      SLUG: slug,
    },
  });
  return getFirm[0];
};
