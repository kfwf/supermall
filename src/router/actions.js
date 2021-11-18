export default {
	addCart(context, payload) {
	  // payload新添加的商品
	  /*
	  let oldProduct = null;
	  let oldProduct = state.CartList.find(item => item.iid === payload.iid)
	  */
	  let oldProduct = null;
	  for(let item of context.state.CartList) {
	    if(item.iid === payload.iid) {
	      oldProduct = item
	    }
	  }
	
	  // 判断oldProduct
	  if (oldProduct) {
	    // oldProduct.count += 1;
	    context.commit('addCounter', oldProduct)
	  } else {
	    payload.count = 1
	    // context.state.CartList.push(payload);
	    context.commit('addToCart', payload)
	  }
	}
}