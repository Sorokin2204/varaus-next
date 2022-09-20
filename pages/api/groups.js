import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';
import { getPaginationList } from '../../utils/getPaginationList';

async function handle(req, res) {
  if (req.method == 'GET') {
    const firm = req.headers['firm'];
    console.log(firm);
    const data = await getPaginationList(req, 'USR_CATEGORY_GROUPS', { C_ACTIVE: true, U_FIRM_ID: firm });
    res.json(data);
  } else if (req.method == 'POST') {
    const { deleteIds } = req.body;
    const deleteGroups = await prismaClient.USR_CATEGORY_GROUPS.updateMany({
      where: {
        U_CATEGORY_GROUP_ID: {
          in: deleteIds,
        },
      },
      data: {
        C_ACTIVE: false,
      },
    });
    res.json(deleteGroups);
  }
}
export default handle;
