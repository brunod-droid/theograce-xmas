'use client';
import {useEffect,useRef,useState} from 'react';
const duration=15;
export default function ShortExperience({brand='theograce'}){
 const oak=brand==='oak';
 const [started,setStarted]=useState(false),[time,setTime]=useState(0),[paused,setPaused]=useState(false),[notice,setNotice]=useState('');
 const audio=useRef(null),raf=useRef(null);
 const [params,setParams]=useState({giver:'Alex',recipient:'Fiona',eta:'December 28',details:['Fiona','Alex']});
 useEffect(()=>{const q=new URLSearchParams(window.location.search);setParams({giver:q.get('giver')||'Alex',recipient:q.get('recipient')||'Fiona',eta:q.get('eta')||'December 28',details:(q.get('details')||'Fiona,Alex').split(',').filter(Boolean).slice(0,4)});},[]);
 useEffect(()=>{if(!started)return;const tick=()=>{const a=audio.current;if(a){setTime(Math.min(duration,a.currentTime));if(!a.paused&&!a.ended)raf.current=requestAnimationFrame(tick)}};raf.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf.current)},[started,paused]);
 async function start(){setStarted(true);setTime(0);setPaused(false);if(audio.current){audio.current.currentTime=0;try{await audio.current.play()}catch{setPaused(true)}}}
 async function share(){const url=window.location.href;try{if(navigator.share){await navigator.share({title:`A Christmas surprise for ${params.recipient}`,text:`${params.giver} has a Christmas surprise for you!`,url});return}if(navigator.clipboard){await navigator.clipboard.writeText(url);setNotice('Personalized link copied!');return}}catch(e){if(e.name==='AbortError')return}setNotice('Copy the link from your browser to share.');}
 const stage=time<5?0:time<10?1:2;const complete=time>=14.9;
 return <main className={`shortXmas ${oak?'shortOak':'shortTheo'}`}>
 <audio ref={audio} src="/late-short-15s.m4a" preload="auto" onEnded={()=>{setTime(duration);setPaused(true)}}/>
 <div className="shortSnow" aria-hidden="true">{Array.from({length:26},(_,i)=><i key={i} style={{'--i':i,'--x':(i*37)%100+'%','--delay':(i%11)*-.7+'s'}}/>)}</div>
 <div className="shortTop"><img src={oak?'/oak-luna-logo.png':'/theograce-logo.svg'} alt={oak?'Oak & Luna':'TheoGrace'}/><span>CHRISTMAS 2026</span></div>
 {!started?<div className="shortContent"><p className="shortKicker">A CHRISTMAS MESSAGE FOR</p><h1>{params.recipient}</h1><p className="shortSub">A little Christmas magic is waiting for you.</p><div className="shortPackage"><img src={oak?'/oak-luna-packaging.png':'/theograce-packaging-transparent.png'} alt="Branded gift packaging"/></div><button onClick={start} className="shortPrimary">Open your Christmas surprise →</button><small>♪ Sound on · 15 seconds</small></div>:
 <><div className="shortProgress">{[0,1,2].map(i=><span key={i}><b style={{width:`${Math.max(0,Math.min(1,(time-i*5)/5))*100}%`}}/></span>)}</div><div className="shortContent" key={stage}>
 {stage===0&&<><p className="shortKicker">CHOSEN JUST FOR YOU</p><h1>{params.recipient},</h1><h2>{params.giver} chose something special for you.</h2><p className="shortSub">Made personal. Made with love.</p></>}
 {stage===1&&<><p className="shortKicker">A LITTLE CLUE</p><h2>Your gift has a story only you can tell.</h2><div className="shortClues">{params.details.map((d,i)=><span key={i}>{d}</span>)}</div><p className="shortSub">The jewelry itself stays a surprise.</p></>}
 {stage===2&&<><p className="shortKicker">YOUR GIFT IS ON ITS WAY</p><h2>The best part is still to come. ♡</h2><p className="shortDelivery">Estimated delivery · {params.eta}</p><p className="shortGreeting">Merry Christmas, {params.recipient}.</p><button className="shortPrimary" onClick={share}>↗ Share with your recipient</button>{notice&&<p className="shortNotice" role="status">{notice}</p>}{complete&&<button className="shortReplay" onClick={start}>Replay ↻</button>}</>}
 </div><button className="shortPause" onClick={async()=>{const a=audio.current;if(a.paused){await a.play();setPaused(false)}else{a.pause();setPaused(true)}}}>{paused&&!complete?'▶ Resume':!complete?'Ⅱ Pause':''}</button></>}
 </main>
}
