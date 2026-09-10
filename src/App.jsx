import { useEffect, useReducer, useRef, useState } from 'react'
import Cart from './Cart.jsx'
import { cartReducer, restoreCart } from './cart.js'
import './App.css'
const instagram = 'https://www.instagram.com/rollsandmoreofficial/'
const maps = 'https://share.google/DlxZ6dkAk7Z8eVmzN'
const menu = {
 Burgers: [['Mania',10,'Beef patty, cheese, lettuce, onion, pickles, tomato & special sauce.'],['The collapse',17,'Beef patty, coleslaw, mayonnaise, ketchup, pickles, cheese & chips.'],['The Fusion',17,'Beef patty, lamb rusher, lettuce, tomato, onion, beetroot, eggs & BBQ sauce.'],['Hyperfocus',10,'Grilled chicken, cheese, mayonnaise, lettuce & pickles.'],['Bipolar stack',15,'Double beef patty, cheese, lettuce, onion, pickles, tomato & special sauce.'],['Paranoia',12,'Grilled chicken, cheese, lettuce, mayonnaise & house hot sauce.'],['Psychosis',12,'Deep-fried crispy chicken, peri peri sauce, cheese, lettuce & pickles.']],
 Wraps: [['Kafta',10,'Homos, biwaz, pickles & tomato.'],['Chicken',10,'Garlic, chips, pickles & coleslaw.'],['Lebanese sausage',10,'Mayonnaise, lettuce, lemon, molasses & pickles.'],['Lamb',10,'Homos, biwaz, pickles & tomato.'],['Sujuk',10,'Tomato, lettuce, mayo, mustard & lemon juice.'],['Samkeh harra',10,'Garlic, lettuce & tomato.'],['Bahria',10,'Marinara mix, lettuce, pickles & ocean sauce.']],
 'Loaded fries': [['Side effect',6,'Hot chips topped with loads of American cheese.'],['Meltdown',12,'Hot chips, seasoned chopped-up beef, American cheese & your choice of sauce.'],['Breakdown',12,'Hot chips, marinated chicken, American cheese & your choice of sauce.']]
}
const catalog = Object.entries(menu).flatMap(([category, items]) => items.map(([name, price, description]) => ({ id: name, name, price, description, category, comboEligible: category !== 'Loaded fries' })))
const categoryVisuals = {
 Burgers: { src: '/images/menu-burger.png', alt: 'A towering double cheeseburger with crisp lettuce, tomato, pickles and dripping sauce', number: '01', kicker: 'DOUBLE-STACKED', note: 'JUICY. MESSY. WORTH IT.' },
 Wraps: { src: '/images/menu-wrap.png', alt: 'Two toasted Lebanese chicken wraps filled with vegetables and garlic sauce', number: '02', kicker: 'ROLLED TO ORDER', note: 'TOASTED. LOADED. READY.' },
 'Loaded fries': { src: '/images/menu-loaded-fries.png', alt: 'Loaded fries covered with grilled chicken, cheese sauce and creamy garlic sauce', number: '03', kicker: 'FULLY LOADED', note: 'CRISPY. SAUCY. ALL YOURS.' }
}
function ArrowUpRight(){return <svg className="ui-icon arrow-up-right" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8"/></svg>}
function ArrowDown(){return <svg className="ui-icon arrow-down" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v13M5 11l5 5 5-5"/></svg>}
function Spark(){return <svg className="ui-icon spark-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1v18M1 10h18M3.6 3.6l12.8 12.8M16.4 3.6 3.6 16.4"/></svg>}
function Brand(){return <a href="#home" className="brand" aria-label="Rolls and More home"><span>Rolls<span className="amp">&</span></span><span>More<sup>®</sup></span></a>}
function App(){
 const [category,setCategory]=useState('Burgers'),[navOpen,setNavOpen]=useState(false),[boardOpen,setBoardOpen]=useState(false)
 const hero=useRef(null),story=useRef(null),dialog=useRef(null),walk=useRef(null)
 const [cart,dispatch]=useReducer(cartReducer,[],()=>{try{return restoreCart(JSON.parse(localStorage.getItem('rolls-demo-cart')||'[]'),catalog)}catch{return []}})
 const [cartOpen,setCartOpen]=useState(false),[toast,setToast]=useState('')
 const count=cart.reduce((n,line)=>n+line.qty,0)
 const categoryVisual=categoryVisuals[category]
 useEffect(()=>{try{localStorage.setItem('rolls-demo-cart',JSON.stringify(cart.map(({id,qty,combo})=>({id,qty,combo}))))}catch{}},[cart])
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),2500);return()=>clearTimeout(timer)},[toast])
 const addItem=(name)=>{const item=catalog.find(item=>item.id===name);const line=cart.find(line=>line.id===name);if(line?.qty>=20){setToast('Maximum 20 of each item in this demo.');return}dispatch({type:'add',item});setToast(`${name} added to your bag.`)}
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1})
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))
  let frame=0
  let viewportHeight=window.innerHeight,viewportWidth=window.innerWidth
  const progress=(element)=>{const r=element.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/Math.max(1,r.height-viewportHeight)))}
  const update=()=>{frame=0;if(reduced.matches)return;hero.current?.style.setProperty('--scroll',Math.min(window.scrollY,1000));if(story.current){const p=progress(story.current);story.current.style.setProperty('--p',p);story.current.style.setProperty('--mobile-shift',`${(p-.5)*18}px`);story.current.style.setProperty('--mobile-exploded-opacity',Math.max(0,1-p*1.55));story.current.style.setProperty('--mobile-stacked-opacity',Math.max(0,Math.min(1,(p-.28)/.6)));story.current.style.setProperty('--mobile-exploded-scale',1-p*.06);story.current.style.setProperty('--mobile-stacked-scale',.82+p*.18)}if(walk.current){const p=progress(walk.current),clamp=n=>Math.max(0,Math.min(1,n));walk.current.style.setProperty('--walk',p);walk.current.style.setProperty('--outside-scale',1+p*.16);walk.current.style.setProperty('--outside-opacity',clamp(1-p*2.7));walk.current.style.setProperty('--doorway-scale',1.08-p*.07);walk.current.style.setProperty('--doorway-opacity',p<.5?clamp((p-.1)/.25):clamp((.9-p)/.3));walk.current.style.setProperty('--inside-scale',1.08-p*.06);walk.current.style.setProperty('--inside-opacity',clamp((p-.58)/.3));walk.current.style.setProperty('--frame-opacity',clamp((p-.2)*1.6));walk.current.style.setProperty('--walk-percent',`${Math.round(p*100)}%`)}}
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
  const resize=()=>{if(Math.abs(window.innerWidth-viewportWidth)>20){viewportWidth=window.innerWidth;viewportHeight=window.innerHeight}scroll()}
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',resize);window.addEventListener('orientationchange',resize);update()
  return()=>{observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);window.removeEventListener('orientationchange',resize);cancelAnimationFrame(frame)}
 },[])
 useEffect(()=>{if(boardOpen)dialog.current?.showModal();else dialog.current?.close()},[boardOpen])
 return <>
 <div className="announcement">BIG BURGERS. BOLD WRAPS. GOOD TIMES. <span>GUILDFORD RD <ArrowUpRight/></span></div>
 <header><Brand/><nav className={navOpen?'open':''} aria-label="Main navigation"><a href="#menu" onClick={()=>setNavOpen(false)}>The menu</a><a href="#about" onClick={()=>setNavOpen(false)}>Our spot</a><a href="#visit" onClick={()=>setNavOpen(false)}>Find us <ArrowUpRight/></a></nav><div className="header-actions"><a className="button yellow header-cta" href="#menu">LET’S EAT <ArrowUpRight/></a><button className="bag-button" onClick={()=>setCartOpen(true)} aria-label={`Open shopping bag, ${count} items`}>BAG <span>{count}</span></button></div><button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={navOpen} onClick={()=>setNavOpen(!navOpen)}><span aria-hidden="true">{navOpen?'×':'☰'}</span></button></header>
 <main>
 <section className="hero roll-hero" id="home" ref={hero}>
  <div className="hero-topline"><span>YOUR NEXT FOOD OBSESSION</span><span>BURGERS / WRAPS / LOADED FRIES</span></div>
  <h1>BIG ROLLS.<br/>BIGGER<br/><span>FLAVOUR.</span></h1>
  <div className="hero-roll"><img src="/images/rolls.png" alt="Rolls and More toasted wraps from the restaurant’s promotional photograph" fetchPriority="high"/></div>
  <span className="hero-lebanese">LEBANESE STREET FOOD, REIMAGINED.</span>
  <div className="stamp"><span>FULL-ON</span><strong>FLAVOUR</strong><span>ZERO BORING BITES</span></div>
  <div className="hero-bottom"><div><p>That real Beirut vibe. Right here in Guildford.<br/>Fresh rolls, bold burgers, and a little more.</p><a href="#menu" className="button cream">EXPLORE THE MENU <ArrowUpRight/></a></div><a className="scroll-hint" href="#layers"><span>SCROLL FOR THE GOOD STUFF</span><b><ArrowDown/></b></a></div><span className="hero-number">01 / MORE IS MORE</span>
 </section>
 <div className="ticker" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>STACK IT HIGH <b><Spark/></b> ROLL WITH IT <b><Spark/></b> SAUCE IT UP <b><Spark/></b> </span>)}</div></div>
 <section className="burger-story" id="layers" ref={story}>
  <div className="story-sticky"><div className="story-copy"><span className="eyebrow">BUILT DIFFERENT. BITE BY BITE.</span><h2>EVERY LAYER.<br/><em>MORE FLAVOUR.</em></h2><p>A golden bun. Crisp greens. Melty cheese.<br/>A proper beef patty. All coming together.</p><span className="story-instruction">KEEP SCROLLING TO STACK IT UP <ArrowDown/></span></div>
   <div className="exploded" role="img" aria-label="Bun, lettuce, cheese, beef patties and bottom bun come together through a lively sauce splash as you scroll">
    <div className="sauce-splash" aria-hidden="true"><svg viewBox="0 0 600 600"><path d="M97 407C33 319 93 205 207 183c95-18 123-93 199-62 65 26 36 111 100 154 81 55 50 175-49 194-80 15-133-50-204-24-58 22-116 18-156-38Z"/><circle cx="83" cy="198" r="23"/><circle cx="491" cy="141" r="15"/><circle cx="535" cy="395" r="25"/><circle cx="167" cy="94" r="12"/></svg></div>
    <div className="flavour-burst" aria-hidden="true">{Array.from({length:8},(_,i)=><span key={i}/>)}</div>
    {[0,1,2,3,4].map((n)=><div key={n} className={`ingredient ingredient-${n}`}><img src="/images/layers.png" alt="" loading="lazy"/></div>)}
    <img className="mobile-burger mobile-burger-exploded" src="/images/layers.png" alt="" aria-hidden="true"/>
    <img className="mobile-burger mobile-burger-stacked" src="/images/burger.png" alt="" aria-hidden="true"/>
    <span className="stacked-stamp" aria-hidden="true">STACKED<br/>RIGHT</span>
   </div>
   <span className="layer-note">THE ANATOMY OF A GOOD BITE.</span>
  </div>
 </section>
 <section className="menu-section section-pad" id="menu"><div className="section-heading reveal"><div><span className="eyebrow">PICK YOUR NEXT OBSESSION</span><h2>THE GOOD <em>STUFF.</em></h2></div><button className="text-link" onClick={()=>setBoardOpen(true)}>View original menu <ArrowUpRight/></button></div>
 <div className="menu-layout"><aside className="menu-feature category-feature reveal"><div className="feature-top"><span className="tiny-label">{categoryVisual.kicker}</span><span>{categoryVisual.number} / 03</span></div><div className="feature-image" key={category}><img src={categoryVisual.src} alt={categoryVisual.alt} loading="lazy"/></div><div className="feature-gradient" aria-hidden="true"/><div className="feature-bottom"><strong>{categoryVisual.note}</strong><span>{menu[category].length} choices · Tap add to build your bag</span></div></aside>
 <div className="menu-content"><div className="menu-tabs" role="tablist" aria-label="Menu categories">{Object.keys(menu).map(name=><button key={name} role="tab" aria-selected={category===name} aria-controls="menu-category-panel" onClick={()=>setCategory(name)}>{name}<sup>{menu[name].length.toString().padStart(2,'0')}</sup></button>)}</div><div className="menu-list-meta"><span>{categoryVisual.kicker}</span><span>{menu[category].length} ITEMS</span></div><div id="menu-category-panel" role="tabpanel" className="menu-items" key={category} aria-live="polite">{menu[category].map(([name,price,description],i)=><article className="menu-item" key={name} style={{'--delay':`${i*40}ms`}}><div><h3>{name}{name==='Bipolar stack'&&<span className="item-tag">DOUBLE UP</span>}</h3><p>{description}</p></div><div className="menu-item-action"><span className="price">${price}</span><button className="add-item" aria-label={`Add ${name} to bag`} onClick={()=>addItem(name)}><span>ADD</span><b aria-hidden="true">+</b></button></div></article>)}</div><div className="combo"><div><strong>MAKE IT A COMBO.</strong><span>Fries + a 375 ml can. The whole deal.</span></div><b>+$5</b></div><p className="disclaimer">Prices from the supplied menu. Confirm current prices and dietary requirements in store.</p></div></div></section>
 <section className="manifesto"><span className="eyebrow reveal">WHY SETTLE FOR LESS?</span><h2 className="reveal">MORE SAUCE.<br/><span>MORE ATTITUDE.</span><br/>MORE, PLEASE.</h2><a className="button yellow reveal" href="#visit">COME GET YOUR FIX <ArrowUpRight/></a><span className="manifesto-star" aria-hidden="true"><Spark/></span></section>
 <section className="walk-section" ref={walk} aria-label="A journey from the street into the restaurant"><div className="walk-sticky"><div className="walk-visual"><img className="walk-scene walk-outside" src="/images/exterior-cinematic.png" alt="The Rolls and More storefront photographed at blue hour" loading="lazy" decoding="async"/><img className="walk-scene walk-doorway" src="/images/doorway-cinematic.png" alt="Looking through the open Rolls and More doorway toward the counter" loading="lazy" decoding="async"/><img className="walk-scene walk-inside" src="/images/interior-immersive.png" alt="A warm, cinematic view inside the Rolls and More restaurant" loading="lazy" decoding="async"/></div><div className="walk-glow"/><div className="walk-frame" aria-hidden="true"><span/><span/><span/><span/></div><div className="walk-shade"/><div className="walk-copy"><span className="eyebrow">329 GUILDFORD ROAD</span><h2>FROM THE STREET.<br/><em>INTO THE FLAVOUR.</em></h2><p>Follow the glow. Your table is just inside.</p><span className="walk-status"><i/> DOORS OPEN. GOOD FOOD AHEAD.</span></div><div className="walk-journey" aria-hidden="true"><div><span>01</span>STREET</div><div><span>02</span>DOORWAY</div><div><span>03</span>INSIDE</div><i/></div><div className="walk-caption"><span>KEEP SCROLLING TO STEP INSIDE <ArrowDown/></span><span>GUILDFORD · NSW</span></div></div></section>
 <section className="about section-pad" id="about"><div className="store-photo reveal"><img src="/images/exterior-cinematic.png" alt="The Rolls and More storefront glowing at blue hour" loading="lazy" decoding="async"/><div className="photo-peek"><img src="/images/doorway-cinematic.png" alt="A view through the restaurant doorway" loading="lazy" decoding="async"/></div><span className="photo-tag">YOUR NEW REGULAR SPOT <ArrowUpRight/></span></div><div className="about-copy reveal"><span className="eyebrow">RIGHT HERE ON GUILDFORD ROAD</span><h2>GOOD FOOD.<br/>YOUR PEOPLE.<br/><em>OUR PLACE.</em></h2><p>Lebanese street food, reimagined. Bold flavours, juicy meats, and loaded rolls packed with that real Beirut vibe. Find your next hunger fix at 329 Guildford Rd, Guildford NSW 2161.</p><a href={maps} target="_blank" rel="noreferrer" className="button red">FIND THE SPOT <ArrowUpRight/></a></div></section>
 <section className="visit section-pad" id="visit"><div className="reveal"><span className="eyebrow">LESS SCROLLING. MORE EATING.</span><h2>HUNGRY?<br/><em>WE THOUGHT SO.</em></h2></div><div className="visit-links reveal"><a href="tel:+61297232175"><span><small>GIVE US A CALL</small>(02) 9723 2175</span><ArrowUpRight/></a><a href={maps} target="_blank" rel="noreferrer"><span><small>COME SAY HEY</small>329 Guildford Rd, Guildford</span><ArrowUpRight/></a><a href={instagram} target="_blank" rel="noreferrer"><span><small>FRESH FROM THE FEED</small>@rollsandmoreofficial</span><ArrowUpRight/></a><a href={maps} target="_blank" rel="noreferrer"><span><small>PLAN YOUR VISIT</small>Check current opening hours</span><ArrowUpRight/></a></div></section>
 </main>
 <div className="mobile-quickbar" aria-label="Quick restaurant actions"><a href="#menu"><small>01</small>MENU</a><a href="tel:+61297232175"><small>02</small>CALL</a><a href={maps} target="_blank" rel="noreferrer"><small>03</small>DIRECTIONS</a></div>
 <footer><div className="footer-top"><Brand/><span>BIG FLAVOUR.<br/>NO HOLDING BACK.</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Rolls & More · Concept website</span><span>Burger illustration & interior retouch: AI. Other photos supplied. Checkout is a demo.</span><a href={instagram} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight/></a></div></footer>
 <Cart open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} dispatch={dispatch}/><div className="toast" role="status" aria-live="polite">{toast}</div>
 <dialog ref={dialog} className="menu-dialog" onCancel={()=>setBoardOpen(false)} onClick={e=>{if(e.target===dialog.current)setBoardOpen(false)}}><div><div className="dialog-header"><h2>The original menu</h2><button aria-label="Close menu" onClick={()=>setBoardOpen(false)}>✕</button></div><img src="/images/menu-board.png" alt="Original restaurant menu board showing wraps, loaded fries and burgers with prices"/><p>Reference photo — please confirm current prices in store.</p></div></dialog>
 </>
}
export default App


