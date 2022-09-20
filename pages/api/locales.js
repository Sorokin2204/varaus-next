import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';
import { getPaginationList } from '../../utils/getPaginationList';

async function handle(req, res) {
  if (req.method == 'GET') {
    const locales = await prismaClient.REG_LOCALES.findMany({
      where: {
        C_ACTIVE: true,
      },
    });

    res.json(locales);
  }
}
export default handle;
