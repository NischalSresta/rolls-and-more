import { useEffect, useRef, useState } from 'react'
import './App.css'
const instagram = 'https://www.instagram.com/rollsandmoreofficial/'
const maps = 'https://share.google/DlxZ6dkAk7Z8eVmzN'
const menu = {
 Burgers: [['Mania',10,'Beef patty, cheese, lettuce, onion, pickles, tomato & special sauce.'],['The collapse',17,'Beef patty, coleslaw, mayonnaise, ketchup, pickles, cheese & chips.'],['The Fusion',17,'Beef patty, lamb rusher, lettuce, tomato, onion, beetroot, eggs & BBQ sauce.'],['Hyperfocus',10,'Grilled chicken, cheese, mayonnaise, lettuce & pickles.'],['Bipolar stack',15,'Double beef patty, cheese, lettuce, onion, pickles, tomato & special sauce.'],['Paranoia',12,'Grilled chicken, cheese, lettuce, mayonnaise & house hot sauce.'],['Psychosis',12,'Deep-fried crispy chicken, peri peri sauce, cheese, lettuce & pickles.']],
 Wraps: [['Kafta',10,'Homos, biwaz, pickles & tomato.'],['Chicken',10,'Garlic, chips, pickles & coleslaw.'],['Lebanese sausage',10,'Mayonnaise, lettuce, lemon, molasses & pickles.'],['Lamb',10,'Homos, biwaz, pickles & tomato.'],['Sujuk',10,'Tomato, lettuce, mayo, mustard & lemon juice.'],['Samkeh harra',10,'Garlic, lettuce & tomato.'],['Bahria',10,'Marinara mix, lettuce, pickles & ocean sauce.']],
 'Loaded fries': [['Side effect',6,'Hot chips topped with loads of American cheese.'],['Meltdown',12,'Hot chips, seasoned chopped-up beef, American cheese & your choice of sauce.'],['Breakdown',12,'Hot chips, marinated chicken, American cheese & your choice of sauce.']]
}
function Brand(){return <a href="#home" className="brand" aria-label="Rolls and More home"><span>Rolls<span className="amp">&</span></span><span>More<sup>®</sup></span></a>}
function App(){
 const [category,setCategory]=useState('Burgers'),[navOpen,setNavOpen]=useState(false),[boardOpen,setBoardOpen]=useState(false)
 const hero=useRef(null),story=useRef(null),dialog=useRef(null)
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1})
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))
  let frame=0
  const update=()=>{frame=0;if(reduced.matches)return;hero.current?.style.setProperty('--scroll',Math.min(window.scrollY,1000));if(story.current){const r=story.current.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/(r.height-window.innerHeight)));story.current.style.setProperty('--p',p)}}
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update()
  return()=>{observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);cancelAnimationFrame(frame)}
 },[])
 useEffect(()=>{if(boardOpen)dialog.current?.showModal();else dialog.current?.close()},[boardOpen])
 return <>
 <div className="announcement">BIG BURGERS. BOLD WRAPS. GOOD TIMES. <span>GUILDFORD RD ↗</span></div>
 <header><Brand/><nav className={navOpen?'open':''} aria-label="Main navigation"><a href="#menu" onClick={()=>setNavOpen(false)}>The menu</a><a href="#about" onClick={()=>setNavOpen(false)}>Our spot</a><a href="#visit" onClick={()=>setNavOpen(false)}>Find us ↗</a></nav><a className="button yellow header-cta" href="#menu">LET’S EAT <span>↗</span></a><button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={navOpen} onClick={()=>setNavOpen(!navOpen)}>{navOpen?'✕':'☰'}</button></header>
 <main>
 <section className="hero" id="home" ref={hero}>
  <div className="hero-topline"><span>YOUR NEXT FOOD OBSESSION</span><span>BURGERS / WRAPS / LOADED FRIES</span></div>
  <h1>BIG FLAVOUR.<br/><span>NO HOLDING BACK.</span></h1><div className="hero-ring"/>
  <div className="hero-burger"><img src="/images/burger.png" alt="Illustrative double cheeseburger with melted cheese and crisp lettuce" fetchPriority="high"/></div>
  <div className="hero-note"><span>go on,</span><strong>GET MESSY.</strong><svg viewBox="0 0 130 80" aria-hidden="true"><path d="M5 8 C10 70 70 70 113 38 M95 39 L116 34 L111 56"/></svg></div>
  <div className="stamp"><span>FULL-ON</span><strong>FLAVOUR</strong><span>ZERO BORING BITES</span></div>
  <div className="hero-bottom"><div><p>Stacked high. Wrapped right.<br/>Made for your kind of hungry.</p><a href="#menu" className="button cream">EXPLORE THE MENU <span>↗</span></a></div><a className="scroll-hint" href="#layers"><span>SCROLL FOR THE GOOD STUFF</span><b>↓</b></a></div><span className="hero-number">01 / MORE IS MORE</span>
 </section>
 <div className="ticker" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>STACK IT HIGH <b>✳</b> ROLL WITH IT <b>✳</b> SAUCE IT UP <b>✳</b> </span>)}</div></div>
 <section className="burger-story" id="layers" ref={story}>
  <div className="story-sticky"><div className="story-copy"><span className="eyebrow">BUILT DIFFERENT. BITE BY BITE.</span><h2>EVERY LAYER.<br/><em>MORE FLAVOUR.</em></h2><p>A golden bun. Crisp greens. Melty cheese.<br/>A proper beef patty. All coming together.</p><span className="story-instruction">KEEP SCROLLING TO STACK IT UP ↓</span></div>
   <div className="exploded" role="img" aria-label="Bun, lettuce, cheese, beef patties and bottom bun come together as you scroll">{[0,1,2,3,4].map((n)=><div key={n} className={`ingredient ingredient-${n}`}><img src="/images/layers.png" alt="" loading="lazy"/></div>)}</div>
   <span className="layer-note">THE ANATOMY OF A GOOD BITE.</span>
  </div>
 </section>
 <section className="menu-section section-pad" id="menu"><div className="section-heading reveal"><div><span className="eyebrow">PICK YOUR NEXT OBSESSION</span><h2>THE GOOD <em>STUFF.</em></h2></div><button className="text-link" onClick={()=>setBoardOpen(true)}>View original menu <span>↗</span></button></div>
 <div className="menu-layout"><aside className="menu-feature reveal"><span className="tiny-label">MEET YOUR MATCH</span><h3>{category==='Burgers'?<>STACKED.<br/>SAUCY.<br/>SERIOUS.</>:category==='Wraps'?<>ROLL UP.<br/>BITE IN.<br/>REPEAT.</>:<>LOADED.<br/>CHEESY.<br/>ALL IN.</>}</h3><img src="/images/burger.png" alt="Burger concept photography" loading="lazy"/><span className="feature-note">A LITTLE MORE OF WHAT YOU LOVE.</span></aside>
 <div className="menu-content"><div className="menu-tabs" aria-label="Menu categories">{Object.keys(menu).map(name=><button key={name} aria-pressed={category===name} onClick={()=>setCategory(name)}>{name}<sup>{menu[name].length.toString().padStart(2,'0')}</sup></button>)}</div><div className="menu-items" key={category} aria-live="polite">{menu[category].map(([name,price,description],i)=><article className="menu-item" key={name} style={{'--delay':`${i*40}ms`}}><div><h3>{name}{name==='Bipolar stack'&&<span className="item-tag">DOUBLE UP</span>}</h3><p>{description}</p></div><span className="price">${price}</span></article>)}</div><div className="combo"><div><strong>MAKE IT A COMBO.</strong><span>Fries + a 375 ml can. The whole deal.</span></div><b>+$5</b></div><p className="disclaimer">Prices from the supplied menu. Confirm current prices and dietary requirements in store.</p></div></div></section>
 <section className="manifesto"><span className="eyebrow reveal">WHY SETTLE FOR LESS?</span><h2 className="reveal">MORE SAUCE.<br/><span>MORE ATTITUDE.</span><br/>MORE, PLEASE.</h2><a className="button yellow reveal" href="#visit">COME GET YOUR FIX <span>↗</span></a><span className="manifesto-star" aria-hidden="true">✳</span></section>
 <section className="about section-pad" id="about"><div className="store-photo reveal"><img src="/images/storefront.png" alt="Rolls and More storefront on Guildford Road decorated with red and yellow balloons" loading="lazy"/><span className="photo-tag">YOUR NEW REGULAR SPOT ↗</span></div><div className="about-copy reveal"><span className="eyebrow">RIGHT HERE ON GUILDFORD ROAD</span><h2>GOOD FOOD.<br/>YOUR PEOPLE.<br/><em>OUR PLACE.</em></h2><p>Lebanese street food, reimagined. Bold flavours, juicy meats, and loaded rolls packed with that real Beirut vibe. Find your next hunger fix at 329 Guildford Rd, Guildford NSW 2161.</p><a href={maps} target="_blank" rel="noreferrer" className="button red">FIND THE SPOT <span>↗</span></a></div></section>
 <section className="visit section-pad" id="visit"><div className="reveal"><span className="eyebrow">LESS SCROLLING. MORE EATING.</span><h2>HUNGRY?<br/><em>WE THOUGHT SO.</em></h2></div><div className="visit-links reveal"><a href="tel:+61297232175"><span><small>GIVE US A CALL</small>(02) 9723 2175</span><span>↗</span></a><a href={maps} target="_blank" rel="noreferrer"><span><small>COME SAY HEY</small>329 Guildford Rd, Guildford</span><span>↗</span></a><a href={instagram} target="_blank" rel="noreferrer"><span><small>FRESH FROM THE FEED</small>@rollsandmoreofficial</span><span>↗</span></a><a href={maps} target="_blank" rel="noreferrer"><span><small>PLAN YOUR VISIT</small>Check current opening hours</span><span>↗</span></a></div></section>
 </main>
 <footer><div className="footer-top"><Brand/><span>BIG FLAVOUR.<br/>NO HOLDING BACK.</span><a href="#home" className="back-top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Rolls & More · Concept website</span><span>Food imagery is illustrative. Storefront and menu supplied as references.</span><a href={instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div></footer>
 <dialog ref={dialog} className="menu-dialog" onCancel={()=>setBoardOpen(false)} onClick={e=>{if(e.target===dialog.current)setBoardOpen(false)}}><div><div className="dialog-header"><h2>The original menu</h2><button aria-label="Close menu" onClick={()=>setBoardOpen(false)}>✕</button></div><img src="/images/menu-board.png" alt="Original restaurant menu board showing wraps, loaded fries and burgers with prices"/><p>Reference photo — please confirm current prices in store.</p></div></dialog>
 </>
}
export default App

