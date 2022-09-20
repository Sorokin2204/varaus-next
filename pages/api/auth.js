import { PrismaClient } from '@prisma/client';
import requestIp from 'request-ip'; // Get Local IP

import { v4 as uuidv4 } from 'uuid';

import { prismaClient } from '../../prisma/prismaClient';
import bcrypt from 'bcrypt';

async function handle(req, res) {
  if (req.method === 'POST') {
    //= get ip and host
    let prisma = prismaClient;

    // const detectedIp = requestIp.getClientIp(req);
    // const host = req.headers.host.split('.')[0];
    // console.log(host);

    // const domains = await prisma.SYS_DOMAINS.findFirst({
    //   where: { AND: [{ S_DOMAIN_CODE: host }, { C_ACTIVE: true }] },
    // });

    // const domainId = domains.U_DOMAIN_ID;
    // const pgName = domains.S_DB_USERNAME;
    // const pgPassword = domains.S_DB_PASSWORD;
    // console.log('pgName ', pgName, ' domainId ', domainId);

    // prisma = new PrismaClient({
    //   datasources: {
    //     db: {
    //       url: 'postgresql://' + pgName + ':' + pgPassword + '@172.17.0.1:5432/main?schema=public',
    //     },
    //   },
    // });

    const { email, password } = req.body;

    // try {

    const findEmail = await prisma.USR_USERS.findMany({
      where: { AND: [{ S_EMAIL: email }, { C_ACTIVE: true }] },
    });
    if (findEmail?.length === 0) {
      throw new Error('NOt found');
    }

    const match = await bcrypt.compare(password, findEmail[0].S_PASSWORD_HASH);
    if (!match) {
      throw new Error('mATCH');
    }
    console.log(findEmail);

    const role = await prisma.REG_ROLES.findMany({
      where: { AND: [{ U_ROLE__ID: findEmail[0]?.U_ROLE_ID }, { C_ACTIVE: true }] },
    });

    let firmsList = [];
    const firms = await prisma.USR_USER_FIRMS.findMany({
      where: { AND: [{ U_USER_ID: findEmail[0]?.U_USER_ID }] },
    });

    for (let firm of firms) {
      firmsList.push(
        await prisma.USR_FIRMS.findMany({
          where: { AND: [{ U_ID: firm?.U_DOMAIN_ID }, { C_ACTIVE: true }] },
        }),
      );
    }
    console.log(firmsList);
    const now = new Date();
    const newSession = await prisma.USR_USER_SESSIONS.create({
      data: {
        U_USER_ID: findEmail[0].U_USER_ID,
        D_BEGIN: now,
        // S_IP: detectedIp,
      },
    });

    // throw new Error();

    res.json({
      id: findEmail[0].U_USER_ID,
      locale: findEmail[0].U_DEFAULT_LOCALE_ID,
      role: role[0]?.S_ROLE_NAME,
      login: findEmail[0].S_LOGIN,
      name: findEmail[0].S_FIRSTNAME,
      lastName: findEmail[0].S_LASTNAME,
      email: findEmail[0].S_EMAIL,
      firms: firmsList,
      // domain: domainId,
      sessionId: newSession?.U_SESSION_ID,
    });
    /*  } catch (error) {
      // console.log(error);
      res.status(401).json({ error: true });
    } */
  }
}

const authUser = async (email, pass) => {
  return true;
};

export default handle;
