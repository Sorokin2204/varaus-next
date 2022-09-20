import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';
import { getPaginationList } from '../../utils/getPaginationList';

async function handle(req, res) {
  if (req.method == 'GET') {
    console.log(req.headers['locale'], 'HEADERS');
    const data = await getPaginationList(
      req,
      'REG_ROLES',
      {},
      {
        Main: 'LOCALE_NAME',
        Description: 'LOCALE_DESC',
      },
    );
    res.json(data);
  } else if (req.method == 'POST') {
    const { deleteIds } = req.body;

    const deleteUsers = await prismaClient.REG_ROLES.deleteMany({
      where: {
        U_ROLE__ID: {
          in: deleteIds,
        },
      },
    });
    res.json(deleteUsers);
  }
}
export default handle;
