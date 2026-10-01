'use client';

import { useEffect, useRef, useState } from 'react';

const STORY = {
  names: { singular:'name', plural:'names', intro:(n)=>`${n} ${n===1?'name':'names'}. ${n===1?'One story. One reason':'Different stories. Different connections. All chosen for a reason.'}`, hint:'These names will always be close to you.' },
  dates: { singular:'date', plural:'dates', intro:(n)=>`${n} ${n===1?'date':'dates'}. ${n===1?'One moment worth remembering.':'Memories and moments worth keeping close.'}`, hint:'Some moments deserve to stay with you.' },
  initials: { singular:'initial', plural:'initials', intro:(n)=>`${n} ${n===1?'initial':'initials'}. Small details with a much bigger meaning.`, hint:'Sometimes the smallest details mean the most.' },
  places: { singular:'place', plural:'places', intro:(n)=>`${n} ${n===1?'place':'places'}. Memories tied to somewhere special.`, hint:'Some places stay with you long after you leave them.' },
  birthstones: { singular:'color', plural:'colors', intro:(n)=>`${n} ${n===1?'color':'colors'}. Each one chosen for a reason.`, hint:'A little color can hold a lot of meaning.' },
  words: { singular:'word', plural:'words', intro:(n)=>`${n} meaningful ${n===1?'detail':'details'}, chosen especially for this gift.`, hint:'The right words can stay with you for a long time.' },
  mixed: { singular:'detail', plural:'details', intro:(n)=>`${n} personal ${n===1?'detail':'details'}. Every one chosen for a reason.`, hint:'Every detail was chosen for a reason.' }
};

function mask(value){
  const s=String(value || '');
  return s.split('').map((c,i)=> /[A-Za-z0-9]/.test(c) && i>0 ? '•' : c).join('');
}

export default function GiftExperience({gift, details}) {
  const [screen,setScreen]=useState(0);
  const [music,setMusic]=useState(false);
  const audio=useRef(null);
  const story=STORY[gift.personalization_type] || STORY.mixed;
  const total=7;

  useEffect(()=>{
    if(!audio.current) return;
    if(music){ audio.current.play().catch(()=>setMusic(false)); }
    else audio.current.pause();
  },[music]);

  function begin(){ setScreen(1); setMusic(true); }
  function next(){ setScreen(s=>Math.min(total-1,s+1)); }
  function back(){ setScreen(s=>Math.max(0,s-1)); }

  return <main className="experience">
    <audio ref={audio} src="/late.m4a" loop preload="auto" />
    <div className="sparkles" aria-hidden="true"><i>✦</i><i>·</i><i>✧</i><i>✦</i><i>·</i></div>
    <article className="stage">
      <header className="topbar">
        <div className="tgLogo">theo grace</div>
        {screen>0 && <button className="music" onClick={()=>setMusic(v=>!v)} aria-label="Toggle music">{music?'♪':'♩'}</button>}
      </header>

      <section className="screen" key={screen}>
        {screen===0 && <>
          <div className="giftIcon"><span>✦</span>🎁</div>
          <div className="kicker">A CHRISTMAS SURPRISE FOR</div>
          <h1>{gift.recipient_name}</h1>
          <p className="lead">Something chosen especially for you is still being made.</p>
          <button className="primary" onClick={begin}>Open my Christmas surprise <b>→</b></button>
          <div className="soundHint">♪ Best experienced with sound</div>
        </>}

        {screen===1 && <>
          <div className="ornament">✦</div>
          <div className="kicker">A LITTLE CHRISTMAS UPDATE</div>
          <h2>Your Christmas gift won’t arrive in time.</h2>
          <p>But that doesn’t mean there’s nothing meaningful to open today.</p>
        </>}

        {screen===2 && <>
          <div className="ornament">✧</div>
          <h2>{gift.customer_name} chose your gift in time.</h2>
          <p>It’s being specially made for you and simply needs a little longer to arrive.</p>
          <div className="goldRule" />
          <p className="emphasis">So for Christmas, you get the first part of the surprise.</p>
        </>}

        {screen===3 && <>
          <div className="kicker">THE GIFT BEFORE THE GIFT</div>
          <h2>There {details.length===1?'is':'are'} {details.length} {details.length===1?'clue':'clues'} hidden in your real gift.</h2>
          <p>{story.intro(details.length)}</p>
          <div className="clueGrid masked">{details.map((x,i)=><div className="clue" key={i}><small>CLUE {i+1}</small><strong>{mask(x)}</strong></div>)}</div>
        </>}

        {screen===4 && <>
          <div className="kicker">READY?</div>
          <h2>These clues weren’t chosen for this game.</h2>
          <p>Every one comes directly from the actual Christmas gift that’s on its way to you.</p>
          <div className="bigSpark">✦</div>
        </>}

        {screen===5 && <>
          <div className="kicker">THE REVEAL</div>
          <h2>{story.hint}</h2>
          <div className="clueGrid revealed">{details.map((x,i)=><div className="clue" key={i}><small>{i+1}</small><strong>{x}</strong><span>✓</span></div>)}</div>
          <p className="fine">These details are part of the gift {gift.customer_name} chose for you.</p>
        </>}

        {screen===6 && <>
          <div className="finalSpark">✦</div>
          <div className="kicker">ONE LAST THING</div>
          <h2>Your real gift is still a secret.</h2>
          <p className="finalNames">Chosen by {gift.customer_name}.<br/>Created especially for {gift.recipient_name}.</p>
          {gift.customer_message && <blockquote>“{gift.customer_message}”</blockquote>}
          <div className="goldRule" />
          <div className="coming">THE REST OF YOUR STORY IS ON ITS WAY</div>
        </>}
      </section>

      {screen>0 && <footer className="nav">
        <button className="back" onClick={back}>←</button>
        <div className="dots">{Array.from({length:total-1},(_,i)=><span key={i} className={screen===i+1?'active':''}/>)}</div>
        {screen<total-1 ? <button className="next" onClick={next}>Next →</button> : <button className="next" onClick={()=>setScreen(0)}>Replay ↻</button>}
      </footer>}
    </article>
  </main>
}
