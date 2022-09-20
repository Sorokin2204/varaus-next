import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';
import { getPaginationList } from '../../utils/getPaginationList';

async function handle(req, res) {
  if (req.method == 'GET') {
    const data = await getPaginationList(req, 'USR_FIRMS');
    res.json(data);
  } else if (req.method == 'POST') {
    const { deleteIds } = req.body;

    const deleteUsers = await prismaClient.USR_FIRMS.deleteMany({
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
