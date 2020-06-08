<template>
	<view style='height:100rpx;'
				class='fixed-bottom flex align-center border-top bg-white'>
		<input type="text" value='' 
					class='flex-1 rounded bg-light ml-2 pl-1 font-sm'
					 v-model='content'
					 @confirm='submit'
					style='padding:5rpx;' 
					placeholder="文明发言">	
		<view class='iconfont icon-fabu flex align-center justify-center font-lg animated'
					@click="submit"
					hover-class="jello text-main"
					style='width: 100rpx;'></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				content:''
			}
		},
		methods:{
			submit(){
				if(this.content==''){
					uni.showToast({
						icon:'none',
						title:'内容不能为空'
					})
					return
				}
				this.$emit('submit',this.content)
				this.content=''
			}
		}
	}
</script>

<style>
</style>
