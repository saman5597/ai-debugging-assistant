import { Router } from 'express';
import { analyzeDebugIssue } from '../controllers/debug.controller';
import { getDebugHistory } from '../controllers/history.controller';
import { getDebugReport } from '../controllers/report.controller';

const router = Router();

router.post('/analyze', analyzeDebugIssue);

router.post('/mock-analyze', (_req, res) => {
  res.json({
    success: true,
    data: {
      summary: 'The users variable is undefined before calling map.',
      rootCause:
        'The component is trying to call .map() on users before the data has loaded or before users has been initialized.',
      severity: 'medium',
      confidenceScore: 0.9,
      suggestedFix:
        'Initialize users as an empty array or use optional chaining before calling map.',
      improvedCode: 'const names = users?.map(user => user.name) || [];',
      preventionTips: [
        'Initialize array state with an empty array.',
        'Add loading states before rendering async data.',
        'Validate API response shape before using it.',
      ],
      followUpQuestions: [
        'Where is users coming from?',
        'Is users fetched asynchronously?',
      ],
    },
  });
});

router.get('/history', getDebugHistory);

router.get('/report/:id', getDebugReport);

export default router;
