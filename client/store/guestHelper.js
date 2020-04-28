// helper function to add items to localStorage
export function addToGuestCart(product) {
  const guestCart = JSON.parse(localStorage.getItem('guestCart'))
  if (guestCart[product.id]) {
    guestCart[product.id].quantity++
  } else {
    guestCart[product.id] = product
    guestCart[product.id].quantity = 1
  }

  localStorage.setItem('guestCart', JSON.stringify(guestCart))
  console.log('----->', JSON.parse(localStorage.getItem('guestCart')))
}

// helper function to remove items from localStorage
export function removeFromGuestCart(productId) {
  const guestCart = JSON.parse(localStorage.getItem('guestCart'))
  const removedProduct = guestCart[productId]
  delete guestCart[productId]
  localStorage.setItem('guestCart', JSON.stringify(guestCart))
  console.log('remove ----->', JSON.parse(localStorage.getItem('guestCart')))
  return removedProduct
}

// helper function to update quantity from localStorage
export function updateQuantityGuestCart(productId, quantity) {
  const guestCart = JSON.parse(localStorage.getItem('guestCart'))
  guestCart[productId].quantity = quantity
  localStorage.setItem('guestCart', JSON.stringify(guestCart))
  console.log('update ---->', JSON.parse(localStorage.getItem('guestCart')))
}
