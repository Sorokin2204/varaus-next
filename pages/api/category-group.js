import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const firm = req.headers['firm'];
    const resault = await getCategoryGroup({ ...req.query, firm });
    console.log(resault);
    res.json(resault);
  } else if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteCategory(req.body?.deleteId);
      res.json(resault);
    } else {
      const firm = req.headers['firm'];
      const resault = await createCategoryGroup({ ...req.body, firm });
      res.json(true);
    }
  } else if (req.method === 'PATCH') {
    const resault = await updateCategory(req.body);
    res.json(resault);
  }
}

const createSubItemSpec = async (item, itemId) => {
  if (item?.__isNew__) {
    const data = {
      U_CATEGORY_PARAM_ITEM_ID: uuidv4(),
      U_DOMAIN_ID: uuidv4(),
      U_CATEGORY_PARAM_ID: itemId,
      S_CATEGORY_PARAM_ITEM_NAME: item.label,
      C_ACTIVE: true,
    };
    return prismaClient.USR_CATEGORY_PARAM_ITEMS.create({ data });
  } else {
    return prismaClient.USR_CATEGORY_PARAM_ITEMS.update({
      where: {
        U_CATEGORY_PARAM_ITEM_ID: item?.value,
      },
      data: {
        C_ACTIVE: true,
      },
    });
  }
};

const createItemSpec = async (catItem, order, groupId) => {
  if (catItem?.deleted) {
    const findItem = prismaClient.USR_CATEGORY_PARAMS.findMany({
      where: {
        U_CATEGORY_PARAM_ID: catItem?.ID,
      },
    });
    if (findItem?.length === 0) {
      return;
    }
    await prismaClient.USR_CATEGORY_PARAM_ITEMS.updateMany({
      where: {
        U_CATEGORY_PARAM_ID: catItem?.ID,
      },
      data: { C_ACTIVE: false },
    });
    return prismaClient.USR_CATEGORY_PARAMS.update({
      where: {
        U_CATEGORY_PARAM_ID: catItem?.ID,
      },
      data: {
        C_ACTIVE: false,
      },
    });
  } else {
    const itemSubItemSpecPromises = [];
    const data = {
      U_CATEGORY_PARAM_ID: catItem?.ID,
      U_CATEGORY_GROUP_ID: groupId,
      U_PARAM_TYPE_ID: catItem.specs[1].value.value,
      S_PARAM_NAME: catItem.specs[0].value,
      N_ORDER: order,
      C_ACTIVE: true,
    };
    await prismaClient.USR_CATEGORY_PARAM_ITEMS.updateMany({
      where: {
        U_CATEGORY_PARAM_ID: catItem?.ID,
      },
      data: {
        C_ACTIVE: false,
      },
    });
    catItem?.subFieldValues.map((catSubItem, index) => itemSubItemSpecPromises.push(createSubItemSpec(catSubItem, catItem?.ID)));
    const upsertSpecItem = prismaClient.USR_CATEGORY_PARAMS.upsert({
      where: {
        U_CATEGORY_PARAM_ID: catItem?.ID,
      },
      create: data,
      update: data,
    });
    return Promise.all([...itemSubItemSpecPromises, upsertSpecItem]);
  }
};

const deleteGroupSpec = async (catGroup) => {
  const findItem = prismaClient.USR_CATEGORY_GROUPS.findMany({
    where: {
      U_CATEGORY_GROUP_ID: catGroup?.ID,
    },
  });
  if (findItem?.length !== 0) {
    await prismaClient.USR_CATEGORY_GROUPS.update({
      where: {
        U_CATEGORY_GROUP_ID: catGroup?.ID,
      },
      data: {
        C_ACTIVE: false,
      },
    });
    if (catGroup?.list.length !== 0) {
      let catItemIndex = 0;
      for (let catItem of catGroup.list) {
        await createItemSpec(catItem, catItemIndex, catGroup?.ID);

        catItemIndex++;
      }
    }
  }
};

const createGroupSpec = async (catGroup, order, catId, firm) => {
  const itemSpecPromises = [];

  if (catGroup?.deleted) {
    return deleteGroupSpec(catGroup);
  } else {
    const data = {
      U_CATEGORY_GROUP_ID: catGroup?.ID,
      U_CATEGORY_ID: catId,
      U_FIRM_ID: firm,
      S_CATEGORY_GROUP_NAME: catGroup?.title,
      N_ORDER: order,
      C_ACTIVE: true,
    };
    await prismaClient.USR_CATEGORY_GROUPS.upsert({
      where: {
        U_CATEGORY_GROUP_ID: catGroup?.ID,
      },
      create: data,
      update: data,
    });

    catGroup?.list.map((catItem, index) => itemSpecPromises.push(createItemSpec(catItem, index, catGroup?.ID)));

    return Promise.all(itemSpecPromises);
  }
};

const createCategoryGroup = async ({ categorySpecs, catId, firm }) => {
  const groupSpecPromises = [];
  categorySpecs.map((catGroup, index) => groupSpecPromises.push(createGroupSpec(catGroup, index, catId, firm)));

  await Promise.all(groupSpecPromises);
};

const getCategoryGroup = async ({ catId, firm }) => {
  const categoryGroups = await prismaClient.USR_CATEGORY_GROUPS.findMany({
    orderBy: {
      N_ORDER: 'asc',
    },
    where: {
      U_CATEGORY_ID: catId,
      U_FIRM_ID: firm,
      C_ACTIVE: true,
    },
  });

  let categoryGroupsWithItems = [];

  for (let group of categoryGroups) {
    const items = await getCategoryGroupItem(group.U_CATEGORY_GROUP_ID);
    categoryGroupsWithItems.push({ ...group, items });
  }
  return categoryGroupsWithItems;
};

export const getCategoryGroupItem = async (groupId) => {
  const categoryItems = await prismaClient.USR_CATEGORY_PARAMS.findMany({
    orderBy: {
      N_ORDER: 'asc',
    },
    where: {
      U_CATEGORY_GROUP_ID: groupId,
      C_ACTIVE: true,
    },
  });

  let categorySubItems = [];

  for (let catItem of categoryItems) {
    const items = await getCategoryGroupSubItem(catItem.U_CATEGORY_PARAM_ID);
    categorySubItems.push({ ...catItem, items });
  }

  return categorySubItems;
};
const getCategoryGroupSubItem = async (itemId) => {
  const categorySubItems = await prismaClient.USR_CATEGORY_PARAM_ITEMS.findMany({
    where: {
      U_CATEGORY_PARAM_ID: itemId,
      C_ACTIVE: true,
    },
  });

  return categorySubItems;
};
