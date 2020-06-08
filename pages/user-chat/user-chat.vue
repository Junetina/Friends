<template>
	<view>
		
		
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" 
								:scroll-into-view="scrollInto"
								scroll-with-animation
								style="position: absolute;left: 0;right: 0;bottom: 100rpx;">
			
			<!-- 聊天列表组件-->
			<block v-for='(item,index) in list' :key='index'>
				<view :id="'chat'+index">
				<!-- 为了达到滚回底部的效果，需要添加一个view标签，配置动态id :id="'chat'+index" -->
					<user-chat-list :item='item' :index='index' :pretime='index>0?list[index-1].create_time:0'></user-chat-list>
				</view>
			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<!-- <view style='height:100rpx;'
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
		</view> -->
		
		<bottom-input @submit='submit'></bottom-input>
	</view>
</template>

<script>
	

	
	import userChatList from '@/components/user-chat/user-chat-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	export default {
		components:{
			userChatList,
			bottomInput
		},
		data(){
			return {
				scrollInto:'',
				list:[{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},{
					user_id:2,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'june,你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
					type:'text',//image video audio
					create_time:1590478724
				},
				{
					user_id:1,
					avatar:'/static/default.jpg',
					username:'昵称',
					data:'Tim,你好啊',
					type:'text',//image video audio
					create_time:1590478724
				}],
				content:''
			}
		},
		
		computed:{
			
			
		},
		//每次页面渲染完成时
		onReady() {
			//执行滚动到底部方法
			this.pageToBottom()
		},
		onLoad(){
			// 为了达到滚到底部的效果,需要把这一段删除,并在swiper-item上增加相对定位
			// uni.getSystemInfo({
			// 	success: res =>{
			// 		this.scrollH=res.windowHeight-uni.upx2px(101)
			// 	}
			// })
			
			
		},
		methods:{
			//点击发送对话
			submit(data){
				// console.log(data) data就是子组件的this.content
					let obj={
						user_id:1,
						avatar:'/static/default.jpg',
						username:'昵称',//以上三个信息在本地缓存去取
						data:data, 
						type:'text',//image video audio
						create_time:(new Date()).getTime()
					}
					
					this.list.push(obj)
				
					this.pageToBottom()
		
			},
			
			//滚动到底部
			pageToBottom(){
				let lastIndex = this.list.length-1
				//要拿到list最后一个索引
				this.scrollInto = 'chat'+lastIndex
				
			}
		}
	}
</script>

<style>
</style>
