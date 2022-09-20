import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';
import { createLocale } from '../../utils/createLocale';

async function handle(req, res) {
  if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteRole(req.body?.deleteId);
      res.json(resault);
    } else {
      const resault = await createRole(req.body, req.headers.locale);
      res.json(resault);
    }
  } else if (req.method === 'PATCH') {
    const resault = await updateRole(req.body);
    res.json(resault);
  }
}

const createRole = async ({ name }, locale) => {
  const roleId = uuidv4();
  const data = {
    U_ROLE__ID: roleId,
    // S_ROLE_NAME: name,
    // U_ROLE_CODE: uuidv4(),
    S_LOCALE_ENTITY_TYPE: 'REG_RROLES_EntityType',
    S_LOCALE_ENTITY_CODE: name,
    C_ACTIVE: true,
  };
  const createRole = await prismaClient.REG_ROLES.create({ data: data });
  // await createLocale(locale, 'role', roleId, name);
  return createRole;
};

const updateRole = async ({ name, id }) => {
  const data = {
    S_LOCALE_ENTITY_CODE: name,
  };
  const updateRole = await prismaClient.REG_ROLES.update({
    where: {
      U_ROLE__ID: id,
    },
    data: data,
  });
  return updateRole;
};
const deleteRole = async (id) => {
  const deleteRole = await prismaClient.REG_ROLES.delete({
    where: {
      U_ROLE__ID: id,
    },
  });
  return deleteRole;
};
export default handle;
