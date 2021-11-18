export default {
	addCart(context, payload) {
	  return new Promise((resolve, reject) => {
      // payload新添加的商品,是否有该商品
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
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.CartList.push(payload);
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
	}
}
