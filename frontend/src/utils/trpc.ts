import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '../../../backend/src/trpc/app';


export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();