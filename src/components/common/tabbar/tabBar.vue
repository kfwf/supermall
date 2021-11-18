<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "tabBar"
	}
</script>

<style scoped>
	#tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		background-color: #f6f6f6;
		box-shadow: 0 -3px 1px rgba(100, 100, 100, .1);
    z-index: 1;
	}
</style>
