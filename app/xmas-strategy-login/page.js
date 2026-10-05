
'use client';
import { useState } from 'react';

export default function StrategyLogin() {
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true); setError('');
    const r=await fetch('/api/xmas-strategy/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({password})
    });
    if(r.ok){ window.location.href='/xmas-strategy'; return; }
    setError('Incorrect password.');
    setLoading(false);
  }

  return <main style={{minHeight:'100svh',display:'grid',placeItems:'center',padding:24,background:'radial-gradient(circle at 15% 15%,rgba(229,181,84,.22),transparent 18%),linear-gradient(150deg,#0d477c,#082e58 45%,#04182e)',color:'white',fontFamily:'Arial,sans-serif'}}>
    <form onSubmit={submit} style={{width:'min(100%,420px)',padding:'38px 32px',border:'1px solid rgba(255,255,255,.18)',borderRadius:20,background:'rgba(5,24,45,.76)',boxShadow:'0 30px 80px rgba(0,0,0,.28)',backdropFilter:'blur(14px)'}}>
      <div style={{fontFamily:'Georgia,serif',fontSize:22,letterSpacing:3,textAlign:'center'}}>XMAS 2026</div>
      <div style={{color:'#e5c57d',fontSize:10,letterSpacing:2.4,textAlign:'center',marginTop:8}}>CONFIDENTIAL STRATEGY</div>
      <h1 style={{fontFamily:'Georgia,serif',fontWeight:400,fontSize:31,textAlign:'center',margin:'34px 0 10px'}}>Private presentation</h1>
      <p style={{fontFamily:'Georgia,serif',color:'#cbd7e1',fontSize:14,lineHeight:1.5,textAlign:'center',margin:'0 0 25px'}}>Enter the password to access the Late for XMAS strategy.</p>
      <input autoFocus type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:'100%',padding:'15px 16px',borderRadius:10,border:'1px solid rgba(255,255,255,.24)',background:'rgba(255,255,255,.08)',color:'white',fontSize:16,outline:'none'}}/>
      {error&&<div style={{color:'#ffb3b3',fontSize:12,marginTop:9}}>{error}</div>}
      <button disabled={loading||!password} style={{width:'100%',marginTop:14,padding:14,border:0,borderRadius:10,background:'#e5c57d',color:'#102b49',fontWeight:700,cursor:'pointer'}}>{loading?'Checking…':'Open strategy'}</button>
      <div style={{textAlign:'center',fontSize:10,color:'#8fa2b4',marginTop:22}}>Internal & confidential</div>
    </form>
  </main>;
}
