import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';

export default async function handle(req, res) {
  if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteCategory(req.body?.deleteId);
      res.json(resault);
    } else {
      const firm = req.headers['firm'];
      const resault = await createCategory({ ...req.body, firm });
      res.json(resault);
    }
  } else if (req.method === 'PATCH') {
    const firm = req.headers['firm'];
    const resault = await updateCategory({ ...req.body, firm });
    res.json(resault);
  }
}
// const createItemSpec = async (catItem) => {};

// const createGroupSpec = async (catGroup) => {};

// createGroupCategory = async ({ categorySpecs, catId }) => {
//   const groupSpecPromises = [];
//   categorySpecs.map((catGroup) => groupSpecPromises.push(createGroupSpec(catGroup)));

//   await Promise.all(groupSpecPromises);
// };

const createCategory = async ({ name, shared, parent, firm }) => {
  const data = {
    U_CATEGORY_ID: uuidv4(),
    U_CATEGORY_PARENT_ID: parent?.value ?? uuidv4(),
    S_CATEGORY_NAME: name,
    C_ACTIVE: true,
    U_FIRM_ID: firm,
    C_SHARED: shared,
  };
  const createCategory = await prismaClient.USR_CATEGORIES.create({ data: data });
  return createCategory;
};

const updateCategory = async ({ name, id, shared, parent, firm }) => {
  const data = {
    U_CATEGORY_PARENT_ID: parent?.value ?? uuidv4(),
    S_CATEGORY_NAME: name,
    C_ACTIVE: true,
    U_FIRM_ID: firm,
    C_SHARED: shared,
  };
  const updateCategory = await prismaClient.USR_CATEGORIES.update({
    where: {
      U_CATEGORY_ID: id,
    },
    data: data,
  });

  await prismaClient.USR_CATEGORY_GROUPS.updateMany({
    where: {
      U_CATEGORY_ID: id,
    },
    data: {
      U_FIRM_ID: firm,
    },
  });
  return updateCategory;
};
const deleteCategory = async (id) => {
  const deleteCategory = await prismaClient.USR_CATEGORIES.update({
    where: {
      U_CATEGORY_ID: id,
    },
    data: {
      C_ACTIVE: false,
    },
  });
  return deleteCategory;
};
