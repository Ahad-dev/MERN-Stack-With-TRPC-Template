import UserDashboard from '@/modules/dashboard/view/dashboard-view'
import { useTRPC } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';

const page = () => {
  const trpc = useTRPC();

  const {data} = useQuery(trpc.user.getUser.queryOptions())
  
  console.log("User Data:", data);
  return (
    <UserDashboard/>
  )
}

export default page