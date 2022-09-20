import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';
import { getCategoryGroupItem } from './category-group';

async function handle(req, res) {
  if (req.method === 'GET') {
    const resault = await getGroup(req.query);
    res.json(resault);
  } else if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteGroup(req.body?.deleteId);
      res.json(resault);
    } else {
      const resault = await createGroup(req.body);
      res.json(resault);
    }
  } else if (req.method === 'PATCH') {
    const resault = await updateGroup(req.body);
    res.json(resault);
  }
}

const createGroup = async ({ name }) => {
  const data = {
    U_ROLE__ID: uuidv4(),
    S_ROLE_NAME: name,
    U_ROLE_CODE: uuidv4(),
    C_ACTIVE: true,
  };
  const createGroup = await prismaClient.USR_CATEGORY_GROUPS.create({ data: data });
  return createGroup;
};

const updateGroup = async ({ name, id }) => {
  const data = {
    S_ROLE_NAME: name,
  };
  const updateGroup = await prismaClient.USR_CATEGORY_GROUPS.update({
    where: {
      U_ROLE__ID: id,
    },
    data: data,
  });
  return updateGroup;
};

const getGroup = async ({ groupId }) => {
  const getGroup = await prismaClient.USR_CATEGORY_GROUPS.findUnique({
    where: {
      U_CATEGORY_GROUP_ID: groupId,
    },
  });

  const groupItems = await getCategoryGroupItem(groupId);

  // prismaClient.USR_CATEGORY_PARAMS.findMany({
  //   where: {
  //     C_ACTIVE: true,
  //     U_CATEGORY_GROUP_ID: groupId,
  //   },
  // });

  return { ...getGroup, items: groupItems };
};
const deleteGroup = async (id) => {
  const deleteGroup = await prismaClient.USR_CATEGORY_GROUPS.update({
    where: {
      U_CATEGORY_GROUP_ID: id,
    },
    data: {
      C_ACTIVE: false,
    },
  });
  return deleteGroup;
};
export default handle;
