'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const STORY={
  names:{hint:'These names will always be close to you.'},
  name:{hint:'One name can hold a whole story.'},
  dates:{hint:'Some moments deserve to stay with you.'},
  initials:{hint:'Sometimes the smallest details mean the most.'},
  places:{hint:'Some places stay with you wherever you go.'},
  birthstones:{hint:'A little color can hold a lot of meaning.'},
  words:{hint:'The right words can stay with you for a long time.'},
  photo:{hint:'Some memories deserve to stay close.'},
  mixed:{hint:'Every detail was chosen for a reason.'}
};
const TIMELINE=[
  {start:0,end:6},{start:6,end:12},{start:12,end:20},{start:20,end:26},
  {start:26,end:32},{start:32,end:38},{start:38,end:44},{start:44,end:50}
];
function mask(value){return String(value||'').split('').map((c,i)=>/[A-Za-z0-9]/.test(c)&&i>0?'_':c).join('');}
function firstName(value){return String(value||'').trim().split(/\s+/)[0]||'Someone';}
function sceneForTime(s){const i=TIMELINE.findIndex(x=>s>=x.start&&s<x.end);return i<0?TIMELINE.length-1:i;}

export default function GiftExperience({gift,details=[]}){
  const [started,setStarted]=useState(false),[scene,setScene]=useState(0),[playing,setPlaying]=useState(false);
  const audio=useRef(null),raf=useRef(null);
  const story=STORY[gift.personalization_type]||STORY.mixed;
  const giver=firstName(gift.customer_name);
  const recipient=String(gift.recipient_name||'').trim();
  const hasRecipient=!!recipient;
  const masked=useMemo(()=>details.map(mask),[details]);

  useEffect(()=>()=>{if(raf.current)cancelAnimationFrame(raf.current)},[]);
  useEffect(()=>{
    if(!started||!audio.current)return;
    const tick=()=>{
      const a=audio.current;if(!a)return;
      setScene(sceneForTime(Math.max(0,a.currentTime||0)));
      if(!a.paused&&!a.ended)raf.current=requestAnimationFrame(tick);
    };
    if(playing)raf.current=requestAnimationFrame(tick);
    return()=>{if(raf.current)cancelAnimationFrame(raf.current)};
  },[started,playing]);

  async function begin(){
    const a=audio.current;setStarted(true);setScene(0);
    if(a){a.currentTime=0;try{await a.play();setPlaying(true)}catch{setPlaying(false)}}
  }
  async function togglePlayback(){
    const a=audio.current;if(!a)return;
    if(a.paused){try{await a.play();setPlaying(true)}catch{}}
    else{a.pause();setPlaying(false)}
  }
  const storyBars=TIMELINE.map((x,i)=>{
    if(scene>i)return 1;if(scene<i||!audio.current)return 0;
    return Math.max(0,Math.min(1,(audio.current.currentTime-x.start)/(x.end-x.start)));
  });

  return <main className="tgExperience tgV13">
    <audio ref={audio} src="/late-50s.m4a" preload="auto" onEnded={()=>{setPlaying(false);setScene(7)}}/>

    {!started ? <section className="tgV13Opening">
      <div className="tgV13Bokeh" aria-hidden="true"/>
      <div className="tgV13Snow" aria-hidden="true"/>
      <img className="tgV13Logo" src="/theograce-logo.svg" alt="TheoGrace"/>
      <div className="tgV13OpeningCopy">
        {hasRecipient&&<div className="tgV13Recipient">{recipient},</div>}
        <h1>you have a Christmas<br/>surprise waiting…</h1>
        <p>Your gift is taking a little longer to arrive.<br/>But the magic can start now.</p>
      </div>
      <div className="tgV13GiftStage" aria-hidden="true">
        <span className="tgV13Glow"/>
        <img src="/theograce-packaging.png" alt=""/>
      </div>
      <button className="tgV13Open" onClick={begin}>Open my surprise <span>›</span></button>
      <div className="tgV13Sound">♪ turn your sound on</div>
    </section> :

    <section className={`tgV13Story tgV13Scene${scene}`} onClick={togglePlayback}>
      <div className="tgV13Backdrop" aria-hidden="true"/>
      <div className="tgV13Bokeh" aria-hidden="true"/>
      <div className="tgV13Snow" aria-hidden="true"/>

      <div className="tgV13Progress" aria-hidden="true">
        {TIMELINE.map((_,i)=><span key={i}><b style={{width:`${storyBars[i]*100}%`}}/></span>)}
      </div>
      <button className="tgV13Pause" onClick={e=>{e.stopPropagation();togglePlayback()}} aria-label={playing?'Pause':'Play'}>{playing?'Ⅱ':'▶'}</button>

      <div className="tgV13Scene" key={scene}>
        {scene===0&&<>
          <div className="tgV13GiftVisual"><img src="/theograce-packaging.png" alt="TheoGrace gift packaging"/></div>
          <div className="tgV13Kicker">CHOSEN BEFORE CHRISTMAS</div>
          <h2>Someone very special chose a meaningful gift just for you.</h2>
          <p>{giver} chose it in time. Something this personal simply needs a little longer.</p>
        </>}

        {scene===1&&<>
          <div className="tgV13Ribbon" aria-hidden="true"><i/><i/></div>
          <div className="tgV13Kicker">THE GIFT BEFORE THE GIFT</div>
          <h2>So tonight, you get the first part of the surprise.</h2>
          <p>Not the design. Not the shape.<br/>Just a little Christmas magic.</p>
          <div className="tgV13Sparkle">✦</div>
        </>}

        {scene===2&&<>
          <div className="tgV13Kicker">LET’S PLAY A LITTLE GAME…</div>
          <h2 className="tgV13WheelTitle">What could it be?</h2>
          <div className="tgV13WheelWrap">
            <div className="tgV13Pointer">▼</div>
            <div className="tgV13Wheel">
              {[1,2,3,4,2,3].map((n,i)=>
                <div className={`tgV13WheelWindow tgV13W${i}`} key={i}>
                  <img src={`/wheel-product-${n}.jpg`} alt="Possible TheoGrace jewelry"/>
                </div>
              )}
              <div className="tgV13WheelSpokes"/>
              <div className="tgV13Hub"><span>?</span><small>YOUR GIFT</small></div>
            </div>
            <div className="tgV13WheelFlash"/>
          </div>
          <div className="tgV13NiceTry"><strong>Nice try… ✨</strong><span>We’re keeping that part a secret.</span></div>
        </>}

        {scene===3&&<>
          <div className="tgV13JewelryBackdrop" aria-hidden="true">
            <img src="/wheel-product-1.jpg" alt=""/>
          </div>
          <div className="tgV13Kicker">BUT HERE’S SOMETHING REAL…</div>
          <h2>Your gift carries clues chosen especially for you.</h2>
          {masked.length?<div className="tgV13Masked">{masked.map((x,i)=><span key={i}>{x}</span>)}</div>:<div className="tgV13Memory">♡</div>}
          <p className="tgV13Small">Every clue comes from the actual gift that is on its way.</p>
        </>}

        {scene===4&&<>
          <div className="tgV13Kicker">CAN YOU GUESS WHO THEY ARE?</div>
          {details.length?<div className="tgV13Reveal">{details.map((x,i)=><div key={i}>{x}</div>)}</div>:<div className="tgV13Memory">✦</div>}
          <div className="tgV13GoldenEnvelope" aria-hidden="true"><span>✦</span></div>
          <p>{story.hint}</p>
        </>}

        {scene===5&&<>
          <div className="tgV13GiftVisual tgV13GiftVisualSmall"><img src="/theograce-packaging.png" alt="TheoGrace gift packaging"/></div>
          <div className="tgV13Kicker">BEAUTIFULLY PREPARED WITH CARE</div>
          <h2>Your real gift is still a secret.</h2>
          <p>Chosen by {giver}.{hasRecipient&&<><br/>Created especially for {recipient}.</>}</p>
          <div className="tgV13UnderWraps">The rest is coming soon ♡</div>
        </>}

        {scene===6&&<div className="tgV13Nicky">
          <div className="tgV13NickyHeading">A little note from Nicky…</div>
          <div className="tgV13NickyPhoto"><img src="/nicky.jpg" alt="Holiday message portrait"/></div>
          <div className="tgV13Note">
            <div>I hope this little glimpse of your gift brings a smile while you wait for the real surprise to arrive.<br/><br/>Wishing you a beautiful holiday season!</div>
            <strong>Nicky ♡</strong>
          </div>
        </div>}

        {scene===7&&<>
          <img className="tgV13FinalLogo" src="/theograce-logo.svg" alt="TheoGrace"/>
          <div className="tgV13Kicker">YOUR GIFT IS ON ITS WAY</div>
          <div className="tgV13Delivery"><small>Estimated delivery</small><strong>{gift.eta||'Monday 28'}</strong></div>
          <div className="tgV13FinalRule"><span>♡</span></div>
          <div className="tgV13Coupon">
            <small>A little something for the wait</small>
            <strong>{gift.coupon_value||'$30'} OFF</strong>
            <span>your next order</span>
            <code>{gift.coupon||'XMAS30'}</code>
          </div>
          <button className="tgV13Replay" onClick={e=>{e.stopPropagation();begin()}}>Replay ↻</button>
        </>}
      </div>
    </section>}
  </main>;
}
