import test from 'node:test'
import assert from 'node:assert/strict'
import { restoreCart, cartReducer, cartTotal } from './cart.js'
const burger = { id: 'Mania', name: 'Mania', price: 10, comboEligible: true }
const fries = { id: 'Side effect', name: 'Side effect', price: 6, comboEligible: false }
test('adding, combo upgrades and quantity changes keep totals consistent', () => {
  let cart = cartReducer([], { type: 'add', item: burger })
  cart = cartReducer(cart, { type: 'add', item: burger })
  cart = cartReducer(cart, { type: 'combo', id: burger.id })
  assert.equal(cartTotal(cart), 30)
  cart = cartReducer(cart, { type: 'quantity', id: burger.id, delta: -1 })
  assert.equal(cartTotal(cart), 15)
  cart = cartReducer(cart, { type: 'quantity', id: burger.id, delta: -1 })
  assert.deepEqual(cart, [])
})
test('saved cart restores prices from the catalog and rejects invalid entries', () => {
  const cart = restoreCart([{ id: burger.id, price: 0, qty: 2, combo: true }, { id: 'unknown', qty: 2 }, { id: fries.id, qty: -1 }], [burger, fries])
  assert.equal(cartTotal(cart), 30)
  assert.equal(cart.length, 1)
  assert.deepEqual(restoreCart(null, [burger]), [])
})
test('quantity caps and ineligible combos are enforced', () => {
  let cart = restoreCart([{ id: fries.id, qty: 1000, combo: true }], [fries])
  cart = cartReducer(cart, { type: 'add', item: fries })
  cart = cartReducer(cart, { type: 'combo', id: fries.id })
  assert.equal(cart[0].qty, 20)
  assert.equal(cart[0].combo, false)
  assert.equal(cartTotal(cart), 120)
})
