export const money = amount => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount)
export function restoreCart(saved, catalog) {
  if (!Array.isArray(saved)) return []
  const seen = new Set()
  return saved.flatMap(line => {
    const item = catalog.find(item => item.id === line?.id)
    if (!item || seen.has(item.id) || !Number.isInteger(line.qty) || line.qty < 1) return []
    seen.add(item.id)
    return [{ ...item, qty: Math.min(20, line.qty), combo: item.comboEligible && line.combo === true }]
  })
}
export function cartReducer(cart, action) {
  if (action.type === 'clear') return []
  if (action.type === 'add') {
    const existing = cart.find(line => line.id === action.item.id)
    return existing ? cart.map(line => line.id === action.item.id ? { ...line, qty: Math.min(20, line.qty + 1) } : line) : [...cart, { ...action.item, qty: 1, combo: false }]
  }
  if (action.type === 'quantity') return cart.map(line => line.id === action.id ? { ...line, qty: Math.min(20, Math.max(0, line.qty + action.delta)) } : line).filter(line => line.qty > 0)
  if (action.type === 'remove') return cart.filter(line => line.id !== action.id)
  if (action.type === 'combo') return cart.map(line => line.id === action.id && line.comboEligible ? { ...line, combo: !line.combo } : line)
  return cart
}
export const lineTotal = line => (line.price + (line.combo ? 5 : 0)) * line.qty
export const cartTotal = cart => cart.reduce((total, line) => total + lineTotal(line), 0)
