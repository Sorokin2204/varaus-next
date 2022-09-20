import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';

export default async function handle(req, res) {
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
  }
}

const createFirm = async ({ name }) => {
  const data = {
    U_ID: uuidv4(),
    U_ID: uuidv4(),
    S_NAME: name,
    C_ACTIVE: true,
  };
  const createFirm = await prismaClient.USR_FIRMS.create({ data: data });
  return createFirm;
};

const updateFirm = async ({ name, id }) => {
  const data = {
    S_NAME: name,
  };
  const updateFirm = await prismaClient.USR_FIRMS.update({
    where: {
      U_ID: id,
    },
    data: data,
  });
  return updateFirm;
};
const deleteFirm = async (id) => {
  const deleteFirm = await prismaClient.USR_FIRMS.delete({
    where: {
      U_ID: id,
    },
  });
  return deleteFirm;
};
