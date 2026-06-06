import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getDebugHistory = async (_req: Request, res: Response) => {
  try {
    const history = await prisma.debugReport.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      select: {
        id: true,
        errorMessage: true,
        severity: true,
        language: true,
        framework: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch debug history',
    });
  }
};
