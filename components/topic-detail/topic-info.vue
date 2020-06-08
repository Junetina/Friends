<template>
	<view>
		<view class='position-relative'
					style="z-index:1;border-bottom:20rpx solid #FFFFFF;">
			<image :src='info.cover' 
							style='height:280rpx;filter: blur(8px);'
							mode='aspectFill'
							class='w-100 position-relative'>
			</image>
		</view>	
		<view class='bg-white position-relative px-2'
					style='margin-top: -20rpx;'>
			<view class='flex align-center'>
				<image :src='info.cover'
							 class='rounded'
								mode='aspectFill'
							 style='height:150rpx;width:150rpx;margin-top: -75rpx;z-index: 10;'></image>
				<text class='px-2 font-md'>#{{info.title}}#</text>
			</view>
			<view>
				<text class='text-hover-secondary font-sm'>动态{{info.news_count}}</text>
				<text class='text-hover-secondary font-sm px-2'>今日{{info.today_count}}</text>
			</view>
			<view class='text-secondary font-sm'>{{info.desc}}</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		props:['info']
	}
</script>

<style>
</style>
