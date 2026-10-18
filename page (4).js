const demos=[
  ['3d-bar','Necklace — 3D Bar / names'],
  ['charming-heart','Necklace — Charming Heart / names'],
  ['bracelet','Bracelet — initials / beads family'],
  ['no-giftee','Fallback — no giftee name']
];
export default function DemoIndex(){return <main style={{maxWidth:640,margin:'60px auto',padding:24,fontFamily:'Arial,sans-serif'}}><h1>TheoGrace XMAS demos</h1><p>Product-safe prototypes: the exact jewelry design is never shown.</p>{demos.map(([id,label])=><p key={id}><a href={`/demo/${id}`}>{label}</a></p>)}</main>}
