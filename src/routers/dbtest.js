import { Router } from 'express';
const testRouter = Router();

testRouter.patch('/test-db', async () => {
  await db
    .collection('users')
    .updateMany(
      { email: { $exists: false } },
      { $set: { email: 'default@example.com' } },
    );
});

export default testRouter;
