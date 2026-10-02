'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const STORY = {
  names: { hint:'These names will always be close to you.' },
  dates: { hint:'Some moments deserve to stay with you.' },
  initials: { hint:'Sometimes the smallest details mean the most.' },
  places: { hint:'Some places stay with you wherever you go.' },
  birthstones: { hint:'A little color can hold a lot of meaning.' },
  words: { hint:'The right words can stay with you for a long time.' },
  mixed: { hint:'Every detail was chosen for a reason.' }
};

// Song-timed scenes, in seconds after the recipient taps "Open".
const TIMELINE = [
  { start:0,  end:8  },
  { start:8,  end:17 },
  { start:17, end:26 },
  { start:26, end:36 },
  { start:36, end:45 },
  { start:45, end:55 },
  { start:55, end:64 },
  { start:64, end:74 }
];

function mask(value){
  const chars=String(value || '').split('');
  return chars.map((c,i)=>/[A-Za-z0-9]/.test(c) && i>0 ? '_' : c).join('');
}

function firstName(value){
  return String(value || '').trim().split(/\s+/)[0] || 'Someone';
}

function sceneForTime(seconds){
  const i=TIMELINE.findIndex(x=>seconds>=x.start && seconds<x.end);
  return i<0 ? TIMELINE.length-1 : i;
}

export default function GiftExperience({gift, details}) {
  const [started,setStarted]=useState(false);
  const [scene,setScene]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [progress,setProgress]=useState(0);
  const audio=useRef(null);
  const raf=useRef(null);
  const story=STORY[gift.personalization_type] || STORY.mixed;
  const giver=firstName(gift.customer_name);

  const masked=useMemo(()=>details.map(mask),[details]);

  useEffect(()=>{
    return ()=>{ if(raf.current) cancelAnimationFrame(raf.current); };
  },[]);

  useEffect(()=>{
    if(!started || !audio.current) return;
    const tick=()=>{
      const a=audio.current;
      if(!a) return;
      const t=Math.max(0,a.currentTime || 0);
      setScene(sceneForTime(t));
      setProgress(Math.min(1,t/74));
      if(!a.paused && !a.ended) raf.current=requestAnimationFrame(tick);
    };
    if(playing) raf.current=requestAnimationFrame(tick);
    return ()=>{ if(raf.current) cancelAnimationFrame(raf.current); };
  },[started,playing]);

  async function begin(){
    const a=audio.current;
    setStarted(true);
    setScene(0);
    setProgress(0);
    if(a){
      a.currentTime=0;
      try{ await a.play(); setPlaying(true); }
      catch{ setPlaying(false); }
    }
  }

  async function togglePlayback(){
    const a=audio.current;
    if(!a) return;
    if(a.paused){
      try{ await a.play(); setPlaying(true); } catch{}
    } else {
      a.pause(); setPlaying(false);
    }
  }

  function replay(){ begin(); }

  const storyBars=TIMELINE.map((x,i)=>{
    const sceneDuration=x.end-x.start;
    let fill=0;
    if(scene>i) fill=1;
    else if(scene===i && audio.current){
      fill=Math.max(0,Math.min(1,(audio.current.currentTime-x.start)/sceneDuration));
    }
    return fill;
  });

  return <main className="tgExperience">
    <audio ref={audio} src="/late.m4a" preload="auto" onEnded={()=>{setPlaying(false);setScene(TIMELINE.length-1);setProgress(1)}} />

    {!started ? <section className="tgOpening">
      <div className="tgOpeningGlow" />
      <img className="tgOfficialLogo tgOfficialLogoLight" src="/theograce-logo.svg" alt="TheoGrace" />
      <div className="tgSnow" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
      <div className="tgOpeningContent">
        <div className="tgEyebrow">A CHRISTMAS MESSAGE FOR</div>
        <h1>{gift.recipient_name},</h1>
        <p className="tgOpeningHeadline">Your Christmas gift won’t arrive in time…</p>
        <p className="tgOpeningSub">but your gift story can still begin today.</p>
        <div className="tgGiftVisual" aria-hidden="true"><span className="tgRibbonV"/><span className="tgRibbonH"/><b>✦</b></div>
        <button className="tgOpenButton" onClick={begin}>Open my Christmas surprise <span>→</span></button>
        <div className="tgSoundHint">♪ Turn your sound on</div>
      </div>
    </section> : <section className="tgStory" onClick={togglePlayback}>
      <div className={`tgStoryBg tgStoryBg${scene}`} />
      <div className="tgStoryTop">
        <div className="tgBars" aria-hidden="true">{TIMELINE.map((_,i)=><span key={i}><b style={{width:`${storyBars[i]*100}%`}}/></span>)}</div>
        <img className="tgOfficialLogo tgOfficialLogoLight" src="/theograce-logo.svg" alt="TheoGrace" />
        <button className="tgAudioButton" onClick={(e)=>{e.stopPropagation();togglePlayback()}} aria-label={playing?'Pause experience':'Play experience'}>{playing?'Ⅱ':'▶'}</button>
      </div>

      <div className="tgScene" key={scene}>
        {scene===0 && <><div className="tgPhotoAtmosphere tgPhotoGift" aria-hidden="true" />
          <div className="tgSpark">✦</div>
          <div className="tgEyebrow">YOUR GIFT WAS CHOSEN IN TIME</div>
          <h2>{giver} chose something especially for you before Christmas.</h2>
          <p>Something this personal takes a little more time to become exactly right.</p>
          <div className="tgMiniGift"><span/><b>For {gift.recipient_name}</b></div>
        </>}

        {scene===1 && <><div className="tgPhotoAtmosphere tgPhotoMagic" aria-hidden="true" />
          <div className="tgEyebrow">THE GIFT BEFORE THE GIFT</div>
          <h2>A little part of your gift is ready to be revealed.</h2>
          <p>Not the gift itself. Just a few details from the story behind it.</p>
          <div className="tgMagicBox"><div/><span>✦</span></div>
        </>}

        {scene===2 && <>
          <div className="tgEyebrow">YOUR CLUES</div>
          <h2>Do these look familiar?</h2>
          <div className="tgClueStack tgMasked">
            {masked.map((x,i)=><div className="tgClue" key={i}><small>0{i+1}</small><strong>{x}</strong></div>)}
          </div>
          <p className="tgFine">Every clue comes from the actual gift that is still on its way.</p>
        </>}

        {scene===3 && <>
          <div className="tgEyebrow">TAKE A GUESS</div>
          <h2>There {details.length===1?'is':'are'} {details.length} personal {details.length===1?'detail':'details'} hidden in your gift.</h2>
          <p>Different memories. Different meanings. All chosen for a reason.</p>
          <div className="tgConstellation" aria-hidden="true">✦ <span>·</span> ✧ <span>·</span> ✦</div>
        </>}

        {scene===4 && <>
          <div className="tgEyebrow">HERE ARE THE REAL ONES</div>
          <div className="tgRevealStack">
            {details.map((x,i)=><div className="tgNameplate" key={i}><span>{x}</span></div>)}
          </div>
          <p className="tgFine">These weren’t created for this experience. They are part of the gift {giver} chose for you.</p>
        </>}

        {scene===5 && <><div className="tgPhotoAtmosphere tgPhotoNYC" aria-hidden="true" />
          <div className="tgEyebrow">STILL A SECRET</div>
          <h2>Your real gift is still under wraps.</h2>
          <p>Chosen by {giver}.<br/>Created especially for {gift.recipient_name}.</p>
          <div className="tgGoldRule" />
          <p className="tgGoldText">{story.hint}</p>
        </>}

        {scene===6 && <div className="tgNickyCard">
          <div className="tgNickyPhotoWrap"><img src="/nicky.jpg" alt="Holiday message portrait" /></div>
          <div className="tgNickyPaper">
            <div className="tgHandwritten">I hope this little glimpse of your gift brings a smile while you wait for the real surprise to arrive.<br/><br/>Wishing you a beautiful holiday season!</div>
            <div className="tgNickyName">Nicky Hilton</div>
            <div className="tgNickyRole">Holiday message</div>
          </div>
        </div>}

        {scene===7 && <>
          <div className="tgSpark tgFinalSpark">✦</div>
          <div className="tgEyebrow">THE REST IS ON ITS WAY</div>
          <h2>More than jewelry.<br/><em>A story for life.</em></h2>
          {gift.customer_message && <blockquote>“{gift.customer_message}”</blockquote>}
          <button className="tgReplay" onClick={(e)=>{e.stopPropagation();replay()}}>Replay the experience ↻</button>
          <div className="tgFinalNote">Your real Christmas gift is still coming.</div>
        </>}
      </div>

      <div className="tgTapHint">{playing?'Tap anywhere to pause':'Tap anywhere to continue'}</div>
    </section>}
  </main>;
}
