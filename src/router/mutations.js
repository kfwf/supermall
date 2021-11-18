export default {
	// 单一管理
	addCounter(state, payload) {
	  payload.count++
	},
	addToCart(state, payload) {
	  state.CartList.push(payload)
	}
}