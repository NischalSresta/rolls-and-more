import { useEffect, useRef, useState } from 'react'
import { cartTotal, lineTotal, money } from './cart.js'
import './Cart.css'

function ArrowUpRight(){return <svg className="ui-icon arrow-up-right" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8"/></svg>}
function ArrowLeft(){return <svg className="ui-icon arrow-left" viewBox="0 0 20 20" aria-hidden="true"><path d="m9 4-6 6 6 6M3 10h14"/></svg>}
function Spark(){return <svg className="ui-icon spark-icon" style={{width:'86px',height:'86px'}} viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1v18M1 10h18M3.6 3.6l12.8 12.8M16.4 3.6 3.6 16.4"/></svg>}

export default function Cart({ open, onClose, cart, dispatch }) {
  const dialog = useRef(null)
  const [step, setStep] = useState('cart')
  const [method, setMethod] = useState('pickup')
  const [receipt, setReceipt] = useState(null)
  const total = cartTotal(cart)
  useEffect(() => {
    if (open) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])
  const close = () => { onClose(); setStep('cart') }
  const complete = () => {
    setReceipt({ total, count: cart.reduce((n, line) => n + line.qty, 0), method })
    setStep('done')
    dispatch({ type: 'clear' })
  }
  return <dialog className="cart-dialog" ref={dialog} onCancel={close} onClick={e => { if (e.target === dialog.current) close() }}>
    <div className="cart-shell">
      <div className="cart-heading"><div><span className="eyebrow">A LITTLE MORE? ALWAYS.</span><h2>{step === 'checkout' ? 'THE LAST BITE.' : step === 'done' ? 'LOOKING GOOD.' : 'YOUR BAG.'}</h2></div><button className="close-cart" onClick={close} aria-label="Close shopping bag">✕</button></div>
      <p className="demo-banner">Concept checkout · No real orders or payments.</p>
      {step === 'done' ? <div className="checkout-done"><span aria-hidden="true">✓</span><h3>That’s how your order could look.</h3><p>{receipt.count} {receipt.count === 1 ? 'item' : 'items'} · {money(receipt.total)}</p><p>This was a demo. Nothing was sent to the restaurant and no money was charged.</p><a href="tel:+61297232175" className="button red">CALL TO ORDER <ArrowUpRight/></a><button className="text-link" onClick={close}>Back to the good stuff <ArrowUpRight/></button></div> : cart.length === 0 ? <div className="cart-empty"><span className="empty-spark" aria-hidden="true"><Spark/></span><h3>Big appetite. Empty bag.</h3><p>Find your favourite burger, wrap or loaded fries.</p><button className="button red" onClick={() => { close(); document.getElementById('menu')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>EXPLORE THE MENU <ArrowUpRight/></button></div> : <>
      {step === 'cart' ? <div className="cart-lines">{cart.map(line => <article className="cart-line" key={line.id}><div className="cart-line-top"><div><small>{line.category}</small><h3>{line.name}</h3></div><strong>{money(lineTotal(line))}</strong></div>{line.comboEligible && <label className="combo-option"><input type="checkbox" checked={line.combo} onChange={() => dispatch({ type: 'combo', id: line.id })}/><span>Make it a combo <b>+$5 each</b><small>Fries + a 375 ml can</small></span></label>}<div className="cart-line-bottom"><div className="quantity"><button aria-label={`Decrease ${line.name} quantity`} onClick={() => dispatch({ type: 'quantity', id: line.id, delta: -1 })}>−</button><output aria-label={`${line.name} quantity`}>{line.qty}</output><button disabled={line.qty >= 20} aria-label={`Increase ${line.name} quantity`} onClick={() => dispatch({ type: 'quantity', id: line.id, delta: 1 })}>+</button></div><button className="remove-item" onClick={() => dispatch({ type: 'remove', id: line.id })}>Remove<span className="sr-only"> {line.name}</span></button></div></article>)}</div> : <div className="checkout-content"><button className="text-link" onClick={() => setStep('cart')}><ArrowLeft/> Back to your bag</button><section><span className="eyebrow">01 / PICKUP</span><h3>See you in Guildford.</h3><p>329 Guildford Rd, Guildford NSW 2161</p><p>Pickup time is confirmed by the restaurant for real orders.</p></section><fieldset><legend>02 / PAYMENT PREVIEW</legend>{[['pickup', 'Pay at pickup', 'Cash or card options are illustrative. Confirm in store.'], ['card', 'Credit or debit card', 'Demo only · Visa / Mastercard'], ['wallet', 'Digital wallet', 'Demo only · Apple Pay / Google Pay']].map(([value, label, hint]) => <label className="payment-option" key={value}><input type="radio" name="payment" value={value} checked={method === value} onChange={() => setMethod(value)}/><span><b>{label}</b><small>{hint}</small></span></label>)}</fieldset><p className="payment-note">No card details are collected. Live checkout requires the restaurant’s payment provider.</p><div className="checkout-summary">{cart.map(line => <div key={line.id}><span>{line.qty} × {line.name}{line.combo ? ' + combo' : ''}</span><b>{money(lineTotal(line))}</b></div>)}</div></div>}
      <div className="cart-totals"><div><span>Total <small>AUD</small></span><strong>{money(total)}</strong></div><p>Based on the supplied menu. Prices subject to restaurant confirmation.</p><button className="button red" onClick={() => step === 'cart' ? setStep('checkout') : complete()}>{step === 'cart' ? 'PREVIEW CHECKOUT' : 'COMPLETE DEMO ORDER'} <ArrowUpRight/></button><span className="checkout-footnote">PICKUP ONLY · DEMO EXPERIENCE</span></div>
      </>}
    </div>
  </dialog>
}

