import { prisma } from './src/lib/prisma';

async function main() {
  const result = await prisma.debugReport.create({
    data: {
      errorMessage: 'test',
      language: 'TypeScript',
      summary: 'test',
      rootCause: 'test',
      severity: 'low',
      confidenceScore: 0.95,
      suggestedFix: 'test',
      preventionTips: [],
    },
  });

  console.log(result);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
