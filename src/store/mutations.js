export default {
	// 单一管理
	addCounter(state, payload) {
	  payload.count++
	},
	addToCart(state, payload) {
    payload.checked = true
	  state.CartList.push(payload)
	}
}