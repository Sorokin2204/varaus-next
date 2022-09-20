import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';
import bcrypt from 'bcrypt';
const userData = {
  S_AVATAR: ' ',
  S_FIRM_MAIN: 'fdf',
  // U_DOMAIN_ID: uuidv4(),
};

async function handle(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const resault = await getUser(id);
    res.json(resault);
  } else if (req.method === 'POST') {
    if (req.body?.deleteId) {
      const resault = await deleteUser(req.body?.deleteId);
      res.json(resault);
    } else {
      console.log(req.body);
      const resault = await createUser(req.body);
      res.json(resault);
    }
  } else if (req.method === 'PATCH') {
    const resault = await updateUser(req.body);
    res.json(resault);
  }
}

const createUser = async ({ id, login, password, email, name, surname, locale, role, active, firms, domain }) => {
  const pass = await bcrypt.hash(password, 3);
  const data = {
    C_ACTIVE: active,
    S_EMAIL: email,
    S_FIRSTNAME: name,
    S_LASTNAME: surname,
    S_LOGIN: login,
    S_PASSWORD_HASH: pass,
    U_DEFAULT_LOCALE_ID: locale,
    // U_DEFAULT_LOCALE_ID: uuidv4(),
    U_ROLE_ID: role,
    U_USER_ID: uuidv4(),
    U_DOMAIN_ID: domain,
    ...userData,
  };

  const createUser = await prismaClient.USR_USERS.create({ data: data });

  const newUserFirms = firms.map((firm) => ({
    U_USER_FIRM_ID: uuidv4(),
    U_DOMAIN_ID: firm,
    U_USER_ID: createUser.U_USER_ID,
  }));

  await prismaClient.USR_USER_FIRMS.createMany({ data: newUserFirms });

  return createUser;
};

const updateUser = async ({ id, login, password, email, name, surname, locale, role, active, firms }) => {
  let pass;
  if (password) {
    pass = await bcrypt.hash(password, 3);
  }

  const data = {
    C_ACTIVE: active,
    S_EMAIL: email,
    S_FIRSTNAME: name,
    S_LASTNAME: surname,
    S_LOGIN: login,
    U_DEFAULT_LOCALE_ID: locale,
    U_ROLE_ID: role,
    ...(pass && { S_PASSWORD_HASH: pass }),
  };

  await prismaClient.USR_USER_FIRMS.deleteMany({ where: { U_USER_ID: id } });

  const newUserFirms = firms.map((firm) => ({
    U_USER_FIRM_ID: uuidv4(),
    U_DOMAIN_ID: firm,
    U_USER_ID: id,
  }));

  await prismaClient.USR_USER_FIRMS.createMany({ data: newUserFirms });

  const updateUser = await prismaClient.USR_USERS.update({
    where: {
      U_USER_ID: id,
    },
    data: data,
  });
  return updateUser;
};
const deleteUser = async (id) => {
  const deleteUser = await prismaClient.USR_USERS.delete({
    where: {
      U_USER_ID: id,
    },
  });
  return deleteUser;
};

const getUser = async (id) => {
  const user = await prismaClient.USR_USERS.findUnique({ where: { U_USER_ID: id } });

  let firms = await prismaClient.USR_USER_FIRMS.findMany({ where: { U_USER_ID: id }, select: { U_DOMAIN_ID: true } });
  firms = firms.map((firm) => firm.U_DOMAIN_ID);
  return { ..._.omit(user, ['S_PASSWORD_HASH']), firms };
};

export default handle;
