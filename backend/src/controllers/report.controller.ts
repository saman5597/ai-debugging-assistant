import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getDebugReport = async (req: Request, res: Response) => {
  try {
    const report = await prisma.debugReport.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    return res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch report',
    });
  }
};
