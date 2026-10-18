
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { isValidStrategyCookie, STRATEGY_COOKIE } from '../../../../../lib/strategyAuth';

const ALLOWED = new Set([
  'compensation-catalog.png','market-comparison.png','current-us-form.png','current-eu-form.png'
]);

export async function GET(request,{params}) {
  const {name}=await params;
  if(!ALLOWED.has(name)) return new NextResponse('Not found',{status:404});
  const jar=await cookies();
  if(!isValidStrategyCookie(jar.get(STRATEGY_COOKIE)?.value)) {
    return new NextResponse('Unauthorized',{status:401});
  }
  const file=await readFile(path.join(process.cwd(),'private-assets','xmas-strategy',name));
  return new NextResponse(file,{headers:{'Content-Type':'image/png','Cache-Control':'private, no-store'}});
}
