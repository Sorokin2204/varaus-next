import { PrismaClient } from '@prisma/client';
import requestIp from 'request-ip'; // Get Local IP

import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '../../prisma/prismaClient';
import bcrypt from 'bcrypt';
async function handle(req, res) {
  if (req.method === 'POST') {
    try {
      const { sessionId } = req.body;

      await prismaClient.USR_USER_SESSIONS.update({
        where: {
          U_SESSION_ID: sessionId,
        },
        data: {
          D_END: new Date(),
        },
      });
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: true });
    }
  }
}

export default handle;
