import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';

async function handle(req, res) {
  if (req.method == 'GET') {
    const firmId = req.headers['firm'];
    const categories = await prismaClient.USR_CATEGORIES.findMany({
      where: { C_ACTIVE: true, OR: [{ U_FIRM_ID: firmId }, { C_SHARED: true }] },
    });
    res.json(categories);
  } else if (req.method == 'POST') {
    const { deleteIds } = req.body;

    const deleteUsers = await prismaClient.USR_CATEGORIES.deleteMany({
      where: {
        U_ID: {
          in: deleteIds,
        },
      },
    });
    res.json(deleteUsers);
  }
}
export default handle;
