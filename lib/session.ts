import { auth } from '@/auth';

export async function requireOwnerSession() {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  return session;
}
