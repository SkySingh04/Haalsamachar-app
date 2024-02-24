import { auth } from '@/auth';

export const getAuth = async () => {
  const session = await auth();
  return session;
};

export default getAuth;
