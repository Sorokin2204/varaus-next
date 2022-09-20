import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';

async function handle(req, res) {
  if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteSection(req.body?.deleteId);
      res.json(resault);
    } else {
      const resault = await createSection(req.body);
      res.json(resault);
    }
  } else if (req.method === 'PATCH') {
    const resault = await updateSection(req.body);
    res.json(resault);
  }
}

const createSection = async ({ name }) => {
  const data = {
    U_CHAPTER_ID: uuidv4(),
    U_DOMAIN_ID: uuidv4(),
    U_USER_FIRM_ID: uuidv4(),
    U_USER_ID: uuidv4(),
    S_NAME: name,
    N_ORDER: 0,
    C_ACTIVE: true,
  };
  const createSection = await prismaClient.USR_CHAPTERS.create({ data: data });
  return createSection;
};

const updateSection = async ({ name, id }) => {
  const data = {
    S_ROLE_NAME: name,
  };
  const updateSection = await prismaClient.USR_CHAPTERS.update({
    where: {
      U_ROLE__ID: id,
    },
    data: data,
  });
  return updateSection;
};
const deleteSection = async (id) => {
  const deleteSection = await prismaClient.USR_CHAPTERS.delete({
    where: {
      U_ROLE__ID: id,
    },
  });
  return deleteSection;
};
export default handle;
