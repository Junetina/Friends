<template>

		<view class='flex align-center px-2 py-2 border-bottom'
					hover-class="bg-white">
				<view class='mr-2'>
					<image  :src='item.avatar'
									class='rounded-circle'
									style='width:100rpx;height:100rpx;'
					></image>
				</view>
				<view class="flex-1 flex flex-column">
					<view class='font-md font-weight-bold'>{{item.username}}</view>
					<uni-badge  :text='item.age' size='small'
											:type="item.sex === 1?'error':'primary'">
					<text class='mr-1 font-sm iconfont'
							:class="item.sex===1?'icon-nv':'icon-nan'" 
								></text>
		
					</uni-badge>
				</view>
				<view class='font-lg text-light-muted iconfont'
							:class='item.isFollow?"icon-zhengque1":"icon-zhengque1 text-main"'
							></view>
								
		</view>

</template>

<script>
		import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		components:{
			uniBadge
		},
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style>
</style>
