import { Request, Response } from 'express';
import { debugRequestSchema } from '../schemas/debug.schema';
import { analyzeErrorWithAI } from '../services/ai.service';

export const analyzeDebugIssue = async (req: Request, res: Response) => {
  try {
    const parsedInput = debugRequestSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request payload',
        errors: parsedInput.error.flatten(),
      });
    }

    const analysis = await analyzeErrorWithAI(parsedInput.data);

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Debug analysis error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to analyze debugging issue',
    });
  }
};
