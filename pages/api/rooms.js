import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prismaClient';
import { getPaginationList } from '../../utils/getPaginationList';
import NextCors from 'nextjs-cors';

async function handle(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method == 'GET') {
    const data = await getPaginationList(req, 'ROOMS');
    res.json(data);
  } else if (req.method == 'POST') {
    const { deleteIds } = req.body;

    const deleteUsers = await prismaClient.ROOMS.deleteMany({
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
