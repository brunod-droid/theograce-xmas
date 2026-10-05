
import { NextResponse } from 'next/server';
import { authToken, STRATEGY_COOKIE } from '../../../../lib/strategyAuth';

export async function POST(request) {
  const configured = process.env.STRATEGY_PASSWORD;
  if (!configured) {
    return NextResponse.json({error:'Strategy password is not configured.'},{status:503});
  }
  const {password=''} = await request.json();
  if (password !== configured) {
    return NextResponse.json({error:'Invalid password.'},{status:401});
  }
  const res = NextResponse.json({ok:true});
  res.cookies.set(STRATEGY_COOKIE, authToken(configured), {
    httpOnly:true, secure:process.env.NODE_ENV==='production',
    sameSite:'strict', path:'/', maxAge:60*60*8
  });
  return res;
}
