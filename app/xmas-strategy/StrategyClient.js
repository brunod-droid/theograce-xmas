
'use client';
import { useState } from 'react';
import styles from './strategy.module.css';

const brands = {
  theograce: {
    label: 'TheoGrace',
    region: 'US',
    video: 'TheoGrace Christmas video',
    redComp: 'Automatic ShineOn late gift',
    monitoringComp: ['ShineOn product', '$20 compensation', '20% off next order'],
    note: 'US flow. ShineOn can be used where timing still allows delivery before Christmas.'
  },
  oak: {
    label: 'Oak & Luna',
    region: 'US',
    video: 'Oak & Luna Christmas video',
    redComp: 'Automatic ShineOn late gift',
    monitoringComp: ['ShineOn product', '$20 compensation', '20% off next order'],
    note: 'US flow. Same late-order framework, with Oak & Luna branding and tone of voice.'
  },
  myka: {
    label: 'MYKA',
    region: 'EU',
    video: 'MYKA Christmas video',
    redComp: 'HU compensation — no ShineOn',
    monitoringComp: ['HU compensation', '$20 equivalent / local compensation', '20% off next order'],
    note: 'EU flow. No ShineOn product. Once the Red Event is missed, there is no realistic product replacement that can arrive by Christmas, so both scenarios converge.'
  }
};

function Step({n,title,children,tone='blue'}) {
  return <div className={`${styles.step} ${styles[tone]}`}>
    <div className={styles.stepNum}>{n}</div>
    <div><h4>{title}</h4><div className={styles.stepBody}>{children}</div></div>
  </div>
}

export default function StrategyClient(){
  const [scenario,setScenario]=useState('red');
  const [brand,setBrand]=useState('theograce');
  const b=brands[brand];

  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.snow}></div>
      <div className={styles.heroInner}>
        <div className={styles.kicker}>XMAS 2026 · CUSTOMER RECOVERY STRATEGY</div>
        <h1>Late for Christmas,<br/><em>without losing the magic.</em></h1>
        <p className={styles.heroLead}>
          A proactive recovery journey for orders at risk of missing Christmas —
          combining clear communication, a branded digital experience, and compensation
          that protects both customer trust and margin.
        </p>
        <div className={styles.heroStats}>
          <div><strong>2</strong><span>operational scenarios</span></div>
          <div><strong>3</strong><span>brand experiences</span></div>
          <div><strong>1</strong><span>clear escalation logic</span></div>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <span>01</span><div><h2>The decision framework</h2><p>One strategy, with a different response depending on when we know Christmas delivery is at risk.</p></div>
      </div>

      <div className={styles.scenarioTabs}>
        <button onClick={()=>setScenario('red')} className={scenario==='red'?styles.activeTab:''}>
          <small>SCENARIO 1</small><strong>Red Event Missed</strong><span>Known operational miss</span>
        </button>
        <button onClick={()=>setScenario('monitor')} className={scenario==='monitor'?styles.activeTab:''}>
          <small>SCENARIO 2</small><strong>Last-Day Monitoring</strong><span>Risk detected late</span>
        </button>
      </div>

      {scenario==='red' ? <div className={styles.scenarioPanel}>
        <div className={styles.panelTop}>
          <div>
            <div className={styles.redBadge}>RED EVENT MISSED</div>
            <h3>We already know the order missed the final production / shipping event.</h3>
            <p>The order is expected to ship the next day, but Christmas delivery is now at risk.</p>
          </div>
          <div className={styles.clockCard}>
            <small>Customer action</small>
            <strong>Proactive</strong>
            <span>Do not wait for the complaint.</span>
          </div>
        </div>
        <div className={styles.flow}>
          <Step n="1" title="Identify affected order" tone="red">
            Order missed the final Red Event. Flag automatically for late-XMAS recovery.
          </Step>
          <Step n="2" title="Send branded late-XMAS message">
            Email / SMS explains the situation clearly and links to the branded Christmas experience.
            <div className={styles.tbd}>EMAIL COPY · TO BE ADDED</div>
          </Step>
          <Step n="3" title="Give something that still arrives for Christmas" tone="gold">
            <b>US:</b> automatically send a ShineOn late gift where delivery timing still works.
            <br/><b>MYKA EU:</b> use HU compensation instead — no ShineOn replacement.
          </Step>
          <Step n="4" title="Escalate only if the customer is still unhappy">
            Agent options: refund shipping fees, or offer a 10–15% partial refund on the order.
          </Step>
        </div>
      </div> :
      <div className={styles.scenarioPanel}>
        <div className={styles.panelTop}>
          <div>
            <div className={styles.amberBadge}>LAST-DAY MONITORING</div>
            <h3>The order may be late, but we only know late in the day.</h3>
            <p>Proactively warn the customer before they discover the problem themselves.</p>
          </div>
          <div className={styles.timeGrid}>
            <div><small>ISRAEL</small><strong>22:00</strong></div>
            <div><small>US EAST</small><strong>15:00</strong></div>
            <div><small>US WEST</small><strong>12:00</strong></div>
          </div>
        </div>
        <div className={styles.timeNote}>10 PM Israel ≈ 3 PM US East Coast / 12 PM US West Coast during the Christmas period.</div>
        <div className={styles.flow}>
          <Step n="1" title="Monitor all orders still at risk" tone="gold">
            At the last monitoring point, isolate orders that may miss Christmas delivery.
          </Step>
          <Step n="2" title="Proactive late-risk message">
            Tell the customer the gift <b>might</b> arrive late — before Christmas Eve disappointment.
            Include the branded Christmas video / experience.
          </Step>
          <Step n="3" title="Customer chooses the compensation" tone="gold">
            Email links to a simple compensation page where the customer picks one option:
            <div className={styles.choiceRow}>
              <span>ShineOn product</span><span>$20</span><span>20% next order</span>
            </div>
          </Step>
          <Step n="4" title="Escalate only if still unhappy">
            Agent options: refund shipping fees, or offer a 10–15% partial refund on the order.
          </Step>
        </div>
      </div>}
    </section>

    <section className={styles.darkSection}>
      <div className={styles.sectionHeadingLight}>
        <span>02</span><div><h2>One recovery strategy, adapted by brand</h2><p>The operational logic stays consistent. The emotional experience is branded.</p></div>
      </div>
      <div className={styles.brandTabs}>
        {Object.entries(brands).map(([key,val])=>
          <button key={key} onClick={()=>setBrand(key)} className={brand===key?styles.brandActive:''}>
            {val.label}<small>{val.region}</small>
          </button>
        )}
      </div>
      <div className={styles.brandPanel}>
        <div className={styles.brandIdentity}>
          <div className={styles.brandOrb}>{b.label.slice(0,2).toUpperCase()}</div>
          <div><small>BRAND EXPERIENCE</small><h3>{b.label}</h3><p>{b.note}</p></div>
        </div>
        <div className={styles.brandCols}>
          <div><small>RED EVENT</small><strong>{b.redComp}</strong></div>
          <div><small>LAST-DAY MONITORING</small><strong>{b.monitoringComp.join(' · ')}</strong></div>
          <div><small>BRANDED VIDEO</small><strong>{b.video}</strong><em>TBD / production asset</em></div>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <span>03</span><div><h2>The compensation choice experience</h2><p>For Last-Day Monitoring, the email sends the customer to a branded page to choose what feels right.</p></div>
      </div>
      <div className={styles.phoneWrap}>
        <div className={styles.phone}>
          <div className={styles.phoneTop}>THEOGRACE</div>
          <div className={styles.phoneSnow}>✦ · ✧ · ✦</div>
          <h3>We’re sorry your gift may<br/>need a little more time.</h3>
          <p>Choose a little something from us for the wait.</p>
          <button><b>🎁 A gift for Christmas</b><span>Choose a ShineOn product ›</span></button>
          <button><b>$20 compensation</b><span>Choose $20 ›</span></button>
          <button><b>20% off your next order</b><span>Choose 20% ›</span></button>
          <small>We’ll still keep you updated on your original gift.</small>
        </div>
        <div className={styles.phoneNotes}>
          <div><b>Simple</b><span>One decision. No support contact required.</span></div>
          <div><b>Brand-safe</b><span>Same logic, different TheoGrace / O&L / MYKA visual experience.</span></div>
          <div><b>Trackable</b><span>Choice can be written back to the order / CRM for reporting.</span></div>
        </div>
      </div>
    </section>


    <section className={styles.sectionAlt}>
      <div className={styles.sectionHeading}>
        <span>04</span><div><h2>What customers see today</h2><p>The current compensation flow works, but it feels operational rather than emotional or branded.</p></div>
      </div>

      <div className={styles.currentExperienceGrid}>
        <div className={styles.currentCard}>
          <div className={styles.currentLabel}>CURRENT US FLOW</div>
          <img src="/api/xmas-strategy/asset/current-us-form.png" alt="Current US compensation form"/>
          <div className={styles.currentNotes}>
            <b>What works</b><span>Simple choice between free gift and discount.</span>
            <b>What breaks the experience</b><span>Looks like a form, not a recovery moment. Product choice feels transactional.</span>
          </div>
        </div>
        <div className={styles.currentCard}>
          <div className={styles.currentLabel}>CURRENT EU FLOW</div>
          <img src="/api/xmas-strategy/asset/current-eu-form.png" alt="Current EU compensation form"/>
          <div className={styles.currentNotes}>
            <b>What works</b><span>Clear compensation path.</span>
            <b>What breaks the experience</b><span>Very functional, low emotional value, and not connected to Christmas gifting.</span>
          </div>
        </div>
      </div>

      <div className={styles.takeaway}>
        <small>2026 OPPORTUNITY</small>
        <strong>Keep the choice logic. Rebuild the experience around care, urgency and Christmas.</strong>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <span>05</span><div><h2>Compensation product universe</h2><p>Separate the operational question — what can arrive on time — from the customer-facing question — what feels like a thoughtful gift.</p></div>
      </div>

      <div className={styles.catalogGrid}>
        <div className={styles.catalogVisual}>
          <img src="/api/xmas-strategy/asset/market-comparison.png" alt="US and EU compensation product comparison"/>
        </div>
        <div className={styles.catalogSummary}>
          <div className={styles.catalogBucket}>
            <small>US · SHINEON</small>
            <h3>Fast, low-cost jewelry compensation</h3>
            <p>Best suited to Red Event misses where a replacement can still realistically arrive before Christmas.</p>
            <ul>
              <li>Stud Earrings — low product cost</li>
              <li>Chain Necklace — broad appeal</li>
              <li>Shipping cost varies by urgency</li>
            </ul>
          </div>
          <div className={styles.catalogBucket}>
            <small>EU · CURRENT / ALTERNATIVES</small>
            <h3>Higher landed cost, fewer timing options</h3>
            <p>EU needs a separate compensation logic because product + shipping cost is higher and timing is less forgiving.</p>
            <ul>
              <li>Current: Beaded Chain Necklace</li>
              <li>Alternatives: Stud Earrings / Box Chain</li>
              <li>MYKA EU should rely more on HU compensation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.productStrip}>
        <img src="/api/xmas-strategy/asset/compensation-catalog.png" alt="Additional compensation products"/>
        <div>
          <small>ADDITIONAL OPTIONS</small>
          <h3>Not every compensation has to be jewelry.</h3>
          <p>Card, Cuban chain, wallet card, pouch and other small items can become part of the backup catalog depending on timing, gender relevance, brand fit and landed cost.</p>
        </div>
      </div>
    </section>

    <section className={styles.darkSection}>
      <div className={styles.sectionHeadingLight}>
        <span>06</span><div><h2>Recommended 2026 choice experience</h2><p>The customer should feel taken care of — not routed into a support form.</p></div>
      </div>

      <div className={styles.futureFlow}>
        <div className={styles.futurePhone}>
          <div className={styles.futureBrand}>THEOGRACE</div>
          <div className={styles.futureKicker}>A LITTLE SOMETHING FOR THE WAIT</div>
          <h3>Your Christmas gift may need a little more time.</h3>
          <p>We’re sorry. Choose what would make the wait a little better.</p>

          <div className={styles.futureOption}>
            <div className={styles.futureIcon}>🎁</div>
            <div><b>Send me a gift for Christmas</b><span>Choose from available gifts that can still arrive in time</span></div>
          </div>
          <div className={styles.futureOption}>
            <div className={styles.futureIcon}>$</div>
            <div><b>Give me $20</b><span>Simple monetary compensation</span></div>
          </div>
          <div className={styles.futureOption}>
            <div className={styles.futureIcon}>%</div>
            <div><b>20% off my next order</b><span>A future-order option for customers who prefer it</span></div>
          </div>

          <div className={styles.futureFooter}>Your original gift is still on its way ♡</div>
        </div>

        <div className={styles.futureLogic}>
          <div><small>IF US + SHINEON CAN ARRIVE</small><strong>Show gift + $20 + 20% options</strong></div>
          <div><small>IF US + TOO LATE FOR PRODUCT</small><strong>Show $20 + 20% only</strong></div>
          <div><small>IF MYKA EU</small><strong>Show HU compensation / gift card / future-order options</strong></div>
          <div><small>IF CUSTOMER STILL COMPLAINS</small><strong>Refund shipping fees → 10–15% partial refund</strong></div>
        </div>
      </div>
    </section>

    <section className={styles.sectionAlt}>
      <div className={styles.sectionHeading}>
        <span>07</span><div><h2>Communication architecture</h2><p>We will add the final email copy and video assets as they become available.</p></div>
      </div>
      <div className={styles.assetGrid}>
        <div className={styles.assetCard}>
          <div className={styles.assetIcon}>✉</div><h3>Customer email</h3>
          <p>Late / at-risk message, clear explanation, emotional framing, CTA to video or compensation selection.</p>
          <span>CONTENT TBD — YOU WILL PROVIDE</span>
        </div>
        <div className={styles.assetCard}>
          <div className={styles.assetIcon}>▶</div><h3>Christmas videos</h3>
          <p>Three branded versions: TheoGrace, Oak & Luna, MYKA.</p>
          <span>VIDEO ASSETS TBD</span>
        </div>
        <div className={styles.assetCard}>
          <div className={styles.assetIcon}>🎁</div><h3>Compensation products</h3>
          <p>ShineOn options for US, HU alternatives for MYKA EU.</p>
          <span>PRODUCT SET TBD</span>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <span>08</span><div><h2>2025 baseline → 2026 opportunity</h2><p>This section is ready for the real 2025 numbers so we can quantify impact and prioritize compensation.</p></div>
      </div>
      <div className={styles.metricGrid}>
        <div><small>LATE XMAS ORDERS</small><strong>—</strong><span>2025 actual</span></div>
        <div><small>CONTACT RATE</small><strong>—</strong><span>late-order customers</span></div>
        <div><small>REFUND / CREDIT COST</small><strong>—</strong><span>2025 actual</span></div>
        <div><small>CANCEL RATE</small><strong>—</strong><span>late-order customers</span></div>
      </div>
      <div className={styles.placeholder}>Next input: 2025 volumes, complaint rate, refunds, cancellations, compensation cost, and top affected SKUs / families.</div>
    </section>

    <section className={styles.footer}>
      <div><small>THE OBJECTIVE</small><h2>Turn “my gift is late” into<br/><em>“they took care of me.”</em></h2></div>
      <p>Proactive communication · emotional recovery · controlled compensation · clear escalation</p>
    </section>
  </main>;
}
