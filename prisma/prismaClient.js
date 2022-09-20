import { PrismaClient } from '@prisma/client';
import axios from 'axios';

let global;

export const prismaClient = global?.prism ?? new PrismaClient();
