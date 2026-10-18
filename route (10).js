
import { NextResponse } from 'next/server';
import { STRATEGY_COOKIE } from '../../../../lib/strategyAuth';
export async function POST() {
  const res=NextResponse.json({ok:true});
  res.cookies.set(STRATEGY_COOKIE,'',{httpOnly:true,path:'/',maxAge:0});
  return res;
}
