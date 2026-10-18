
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StrategyClient from './StrategyClient';
import { isValidStrategyCookie, STRATEGY_COOKIE } from '../../lib/strategyAuth';

export const metadata = {
  title: 'Late for XMAS 2026 Strategy',
  robots: { index:false, follow:false, nocache:true }
};
export const dynamic = 'force-dynamic';

export default async function Page() {
  const jar=await cookies();
  if(!isValidStrategyCookie(jar.get(STRATEGY_COOKIE)?.value)) redirect('/xmas-strategy-login');
  return <StrategyClient />;
}
