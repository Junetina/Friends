<template>
	<view>
		<!-- 消息列表组件 -->
		<block v-for='(item,index) in list' :key='index'>
			<msg-list :item='item' :index='index'></msg-list>
		</block>
		
		<!-- 弹出层 -->
		<uni-popup ref='popup' type='top'>
			<view class=' bg-white'>
				<!-- 添加好友 -->
				<view class='flex justify-center align-center border-bottom font-md py-2'
							@click="popupEvent('friend')"
							hover-class="bg-light">
					<text class='iconfont icon-zengjia1 px-2'></text>
					<text>添加好友</text>
				</view>
				<!-- 删除列表 -->
				<view class='flex justify-center align-center font-md py-2'
							@click="popupEvent('delete')"
							hover-class="bg-light">
					<text class='iconfont icon-shanchu px-2'></text>
					<text>删除列表</text>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo =[
		{avatar : '/static/default.jpg',
		username:"june",
		update_time:1590478724,
		data:'下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭',
		noread:3},
		{avatar : '/static/default.jpg',
		username:"june",
		update_time:1590478724,
		data:'下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭',
		noread:3},
		{avatar : '/static/default.jpg',
		username:"june",
		update_time:1590478724,
		data:'下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭',
		noread:3},
		{avatar : '/static/default.jpg',
		username:"june",
		update_time:1590478724,
		data:'下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭',
		noread:3},
		{avatar : '/static/default.jpg',
		username:"june",
		update_time:1590478724,
		data:'下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭下午吃饭',
		noread:3},
	]
	import msgList from '@/components/msg/msg-list.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		//监听点击原生导航栏事件
		onNavigationBarButtonTap(e) {
			console.log(e)
			switch (e.index){
				case 1://左边
				uni.navigateTo({
					url:'../user-list/user-list'
				})
				this.$refs.popup.close()
					break;
				case 0://右边
				// console.log('弹出层')
				this.$refs.popup.open()
					break;
			}
		},
		onLoad() {
			this.list=demo
		},
		//监听用户下拉刷新
		onPullDownRefresh() {
			console.log(0)
			//执行刷新
			this.refresh()
		},
		components:{
			msgList,
			uniPopup
		},
		data(){
			return{
				list:[]
			}
		},
		methods:{
			
			//弹出层点击事件
			popupEvent(text){
				switch (text){
					case "friend":
					console.log('添加好友')
					this.$refs.popup.close()
					uni.navigateTo({
						url:'../search/search?type=addfriend'
					})
						break;
					case "delete":
					console.log('删除列表')
					this.$refs.popup.close()
						break;
				}
			},
			//刷新事件
			refresh(){
				setTimeout(()=>{
					this.list=demo
					uni.showToast({
						title:"刷新成功"
					})
					uni.stopPullDownRefresh()
				},3000)
			}
		}
	}
</script>

<style>
</style>
