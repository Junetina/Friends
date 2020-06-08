<template>
	<view class='pt-2 container'>
		<!-- 用户信息:头像部分|关注部分 -->
		<view class='flex justify-between mb-2 align-center'>
			<view class='flex align-center'>
				<view class="mr-2">						
					<image 	:src="item.userpic" 
									@click.stop='infoEvent'
									class='rounded' 
									lazy-load 
									style='width:66rpx;height:66rpx;'></image>
				</view>
				<view>
					<view class='font text-hover-dark' @click.stop='infoEvent' @click="goDetail">{{item.username}}</view >
					<view  class='font-small text-light-muted' @click="goDetail" >{{item.newstime}}</view >
				</view>
			</view>
			<view>
								<!-- :class='[isFollow==true?follow:unfollow,]' -->
				<button class='text-white font-sm animated bg-main' 
								v-if='!item.isFollow'
								style='height:50rpx;line-height: 50rpx;'
								@click="isFollowEvent">
								<!-- @click="isFollowEvent(item.isFollow) -->
					{{followText}}
				</button>
			</view>
		</view>
		<!-- 发布内容：发布文字 发布图片 -->
		<view @click="goDetail">
			<view class='mb-1 text-hover-dark font'
						>
						{{item.title}}
			</view>
			<slot>
				<image 	:src='item.titlepic'
								v-if='item.titlepic' 
								class='w-100 rounded' 
								lazy-load
								style='height:350rpx;'></image>
			</slot>
			
		</view>
		<!-- 图标栏部分 -->
		<view class='flex justify-center align-center' style='height:86rpx;'>
			<!-- 顶 -->
			<view class='flex flex-1 align-center justify-center'
						:class='[item.support.type==="support"?"support-active":""]'
						animated
						@click="doSupport('support')"
						hover-class="support-active animated swing">
						<!-- 注意：hover-class里面的激活颜色类名一定要和.text-main类名不同，否则就会失效 -->
				<text class='iconfont icon-dianzan2 font-lg text-hover-black mr-1'></text>
				<text class='text-hover-black font-sm'>{{item.support.support_count>0?item.support.support_count:"支持"}}</text>
			</view>
			<!-- 踩 -->
			<view class='flex flex-1 align-center justify-center'
						:class='[item.support.type==="unsupport"?"support-active":""]'
						animated
						@click="doSupport('unsupport')"
						hover-class="support-active animated swing">
				<text class='iconfont icon-cai font-lg text-hover-black mr-1'></text>
				<text class='text-hover-black font-sm'>{{item.support.unsupport_count>0?item.support.unsupport_count:"反对"}}</text>
			</view>
			<!-- 评论 -->
			<view class='flex flex-1 align-center justify-center'
						animated
						@click="doComment"
						hover-class="text-main animated swing">
				<text class='iconfont icon-pinglun2 text-hover-black mr-1' style="font-size: 50rpx;"></text>
				<text class='text-hover-black font-sm'>{{item.comment_count>0?item.comment_count:"评论"}}</text>
			</view>
			<!-- 分享 -->
			<view class='flex flex-1 align-center justify-center'
						animated
						@click="doShare"
						hover-class="text-main animated swing">
			<text class='iconfont icon-zhuanfa1 text-hover-black mr-1' style="font-size: 45rpx;"></text>
			<text class='text-hover-black font-sm'>{{item.share_num>0?item.share_num:"分享"}}</text>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				unfollow:'unfollow',
				follow:'follow',
				followText:"关注",
				// isFollow:this.followStatus
			}
		},
		props: {
			item: Object,
			index:{
				type:Number,
				default:-1
			},
			//默认不是在详情页
			isDetail:{
				type:Boolean,
				default:false
			}
			
			// followStatus:Boolean
		},
		methods:{
			//点击头像
			infoEvent(){
				console.log('进入个人信息更改')
			},
			// 点踩事件
			doSupport(type){
				//操作权限验证
				this.checkAuth(()=>{
					this.$emit("doSupport",{
						type,
						eIndex:this.index
					})
				})
			},
			
			//点击评论
			doComment(){
				
				console.log(this.checkAuth)
				this.checkAuth(()=>{
					if(!this.isDetail){
						return this.goDetail()
					}
					this.$emit('doComment')
				})
				
			},
			//点击分享
			doShare(){
				
				this.checkAuth(()=>{
					if(!this.isDetail){
						return this.goDetail()
					}
					
					this.$emit('doShare')
				})
				
			},
			//进入详情页面
			goDetail(){
				//判断是否是在详情页，如果是就不需要渲染这一步步骤，不需要再点击，如果不是，就是在首页，需要这一步步骤
				if(this.isDetail) return
				// this.$emit('goDetail',this.index)
				uni.navigateTo({
					url:'../../pages/detail/detail?detail='+JSON.stringify(this.item)
				})
			},
			//关注事件
			isFollowEvent(){
				/*以下是另外一个关注,点击后出现 已关注的样式时间-通过props更改状态值:
				this.isFollow=!this.isFollow
				if(this.isFollow){
					this.followText='已关注'
				 }else{
				 	this.followText='关注'
				}*/
				// 通知父组件进行关注并提示
				this.checkAuth(()=>{
					this.$emit('followEvent',this.index)
				})
			}
		}
	}
</script>

<style>

</style>
