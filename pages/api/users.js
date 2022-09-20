import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';
import _ from 'lodash';
import { getPaginationList } from '../../utils/getPaginationList';
async function handle(req, res) {
  if (req.method == 'GET') {
    const data = await getPaginationList(req, 'USR_USERS', { C_ACTIVE: true });
    const newData = { ...data, list: data.list.map((user) => _.omit(user, ['S_PASSWORD_HASH'])) };
    res.json(newData);
  } else if (req.method == 'POST') {
    const { deleteIds } = req.body;

    const deleteUsers = await prismaClient.USR_USERS.deleteMany({
      where: {
        U_USER_ID: {
          in: deleteIds,
        },
      },
    });
    res.json(deleteUsers);
  }
}
export default handle;
