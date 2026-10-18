import GiftExperience from './GiftExperience';

export const dynamic = 'force-dynamic';

async function getGift(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase environment variables');
  const endpoint = `${url}/rest/v1/xmas_gifts?public_token=eq.${encodeURIComponent(token)}&select=*&limit=1`;
  const res = await fetch(endpoint,{headers:{apikey:key,Authorization:`Bearer ${key}`,Accept:'application/json'},cache:'no-store'});
  if(!res.ok) throw new Error(`Supabase error: ${res.status}`);
  const rows=await res.json();
  return rows[0] || null;
}

export default async function GiftPage({params}) {
  const {token}=await params;
  const gift=await getGift(token);
  if(!gift) return <main className="page"><div className="error"><h1>Gift not found</h1><p>This Christmas gift link is invalid or no longer available.</p></div></main>;
  const details=Array.isArray(gift.personalization)?gift.personalization.filter(Boolean):[];
  // Product name intentionally stays server-side and is never rendered to preserve the surprise.
  const safeGift={
    recipient_name:gift.recipient_name,
    customer_name:gift.customer_name,
    personalization_type:gift.personalization_type,
    customer_message:gift.customer_message || ''
  };
  return <GiftExperience gift={safeGift} details={details}/>;
}
