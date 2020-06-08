<template>
	
	<view>
		<!-- 完善时间记录 -->
		<view class='text-center text-muted py-1'>{{shortTime}}</view>
		
		<!-- 消息列表 -->
		<view class='flex mx-2 align-start py-2'
					:style='isSelf?"flex-direction: row-reverse;":""'>
					<!-- isSelf通过计算属性判断是否是本人，本人在右边，对方在左边 -->
					
			<image :src='item.avatar' style='height: 100rpx;width: 100rpx;'
							class='rounded-circle'></image>
			<view class='mx-2 p-2 bg-five rounded'
						style='max-width: 430rpx;min-width: 100rpx;'>
				<text class='bg-hover-secondary'>{{item.data}}</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	// 模拟当前登录用户的userid
	const uid=1
	import $T from '@/common/time.js'
	export default {
		props:{
			item:Object,
			index:Number,
			pretime:[Number,String]//上一条消息的时间戳
		},
		computed:{
			//判断是否是当前用户本人，如果是本人，对话框就在右边，需要添加row-reverse属性，如果不是本人，就是对方，对话框在左边，就不添加样式
			isSelf(){
				// console.log(uid===this.item.user_id)
				return uid===this.item.user_id
			},
			
			//判断是否显示时间，超过5分钟才显示，如果不超过5分钟就不显示
			shortTime(){
				return $T.getChatTime(this.item.create_time,this.pretime)
			}
		}
	}
</script>

<style>

</style>
