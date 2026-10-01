export const dynamic = 'force-dynamic';

async function getGift(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const endpoint =
    `${url}/rest/v1/xmas_gifts?public_token=eq.${encodeURIComponent(token)}&select=*&limit=1`;

  const res = await fetch(endpoint, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Supabase error: ${res.status}`);
  }

  const rows = await res.json();
  return rows[0] || null;
}

function labelFor(type, count) {
  const n = count || 0;
  if (type === 'names') return n === 1 ? 'One meaningful name' : `${n} meaningful names`;
  if (type === 'dates') return n === 1 ? 'One meaningful date' : `${n} meaningful dates`;
  if (type === 'initials') return n === 1 ? 'One meaningful initial' : `${n} meaningful initials`;
  if (type === 'places') return n === 1 ? 'One meaningful place' : `${n} meaningful places`;
  return n === 1 ? 'One meaningful detail' : `${n} meaningful details`;
}

export default async function GiftPage({ params }) {
  const { token } = await params;
  const gift = await getGift(token);

  if (!gift) {
    return (
      <main className="page">
        <div className="error">
          <h1>Gift not found</h1>
          <p>This Christmas gift link is invalid or no longer available.</p>
        </div>
      </main>
    );
  }

  const details = Array.isArray(gift.personalization)
    ? gift.personalization.filter(Boolean)
    : [];

  return (
    <main className="page">
      <article className="phone">
        <div className="inner">
          <div className="logo">theo grace</div>

          <div className="eyebrow">A CHRISTMAS MESSAGE FOR</div>
          <h1>{gift.recipient_name}</h1>

          <h2>Your Christmas gift won’t arrive in time.</h2>
          <p>But your gift story can still begin today.</p>

          <div className="card">
            <div className="eyebrow">THE GIFT BEFORE THE GIFT</div>
            <p>
              {gift.customer_name} chose something especially for you before Christmas.
              It simply needs a little longer to be made.
            </p>

            <div className="eyebrow" style={{marginTop: 22}}>
              {labelFor(gift.personalization_type, details.length)}
            </div>

            <div className="details">
              {details.map((item, index) => (
                <div className="detail" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="product">
            Your real gift is still a secret: {gift.product_name}
          </p>

          {gift.customer_message ? (
            <p className="note">{gift.customer_message}</p>
          ) : null}

          <div className="eyebrow" style={{marginTop: 28}}>
            THE REST OF YOUR STORY IS COMING SOON
          </div>
        </div>
      </article>
    </main>
  );
}
