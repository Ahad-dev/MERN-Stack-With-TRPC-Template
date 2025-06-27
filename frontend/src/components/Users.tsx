import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../utils/trpc';
export default function User() {
  const trpc = useTRPC(); // use `import { trpc } from './utils/trpc'` if you're using the singleton pattern
    const {data , isLoading,isError} = useQuery(trpc.user.getUser.queryOptions());

    if(isLoading){
        return <div>Loading...</div>;
    }
    if(isError){
        return <div>Error loading user data</div>;
    }

  return (
    <div>
      <h1>User Information</h1>
      <p>ID: {data?.id}</p>
      <p>Name: {data?.name}</p>
    </div>
  );
}