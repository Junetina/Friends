<template>
		<view>
					<!-- tab -->
					<view class="flex align-center border-bottom" style="height: 100rpx;">
						<view class="flex-1 flex align-center justify-center"
						v-for="(item,index) in tabLi" :key="index"
						:class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md'"
						@click="changeTab(index)">
						{{item.name}} <text v-if="item.num > 0" class="ml-2">{{item.num}}</text></view>
					</view>
					<divider></divider>
					<!-- 主体内容 -->
					<swiper :duration="150"
									:style='"height:"+mainHeight+"px;"'
									@change='onChangeTap'
									:current='tabIndex'>
						<swiper-item v-for='(item,index) in listData'
												 :key='index'>
							<scroll-view  scroll-y
														@scrolltolower="loadmore(index)"
														:style='"height:"+mainHeight+"px;"'>
								<!-- 列表展示 有数据的情况-->
								<template v-if='item.list.length>0'>			
									<block v-for='(item2,index2) in item.list' :key='index2'>
										<!-- 封装好友列表组件 -->
										<user-list :item='item2' :index='index2'></user-list>
									</block>
									<!-- 上拉加载组件 -->
									<load-more v-if='item.list.length.length>10' :loadmore='item.loadmore'></load-more>
								</template>
								<!-- 列表展示 无数据的情况 缺省页的展示-->
								<template v-else>
									<nothing></nothing>
								</template>
							</scroll-view>
						</swiper-item>
					</swiper>
		</view>
</template>

<script>
	const demo =[
		{avatar : '/static/default.jpg',
		username:"june",
		sex:1,
		age:24,
		isFollow:true
		},
		{avatar : '/static/default.jpg',
		username:"john",
		sex:0,
		age:24,
		isFollow:false
		},
		{avatar : '/static/default.jpg',
		username:"june",
		sex:1,
		age:24,
		isFollow:true
		},
		{avatar : '/static/default.jpg',
		username:"june",
		sex:1,
		age:24,
		isFollow:true
		},
		{avatar : '/static/default.jpg',
		username:"malcco",
		sex:0,
		age:24,
		isFollow:false
		}
	]
	import userList from '@/components/user-list/user-list.vue'
	import loadMore from '@/components/common/loadmore.vue'
	export default {
		components:{
			loadMore,
			userList
		},
		//监听点击输入框
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:'../search/search?type=user'
			})
		},
		//监听导航栏按钮
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta:1
			})
		},
		data(){
			return{
				listData:[],
				mainHeight:800,
				// 顶部选项卡
				tabIndex:0,
				scrollInto:'',
				tabLi:[{
					name:"互关",
					num:0
				},{
					name:"关注",
					num:2
				},{
					name:"粉丝",
					num:30
				}]
			}
		},
		onLoad() {
			uni.getSystemInfo({
					success: res=> {
					this.mainHeight=res.windowHeight - uni.upx2px(115)
				}
			})
			
			//页面加载就获取数据
			this.getData()
		},
		methods:{
			//获取数据
			getData(){
				var arr=[];
				for (var i=0;i<this.tabLi.length;i++) {
					//生产列表模板
					var obj={
						//1.上拉加载更多 2.加载中... 3.没有更多了
						loadmore:"上拉加载更多",
						list:[]
					}
					//模仿假数据为空的情景
					if(i<2){
						obj.list=demo
					}
					//把arr想象成listData对象，把obj里面想象成 list:[]这种结构
					arr.push(obj)
				}
				this.listData = arr
			},
			
			// 把主体内容和tab选项绑定成为一体,监听主体内容的滑块
			onChangeTap(e){
				console.log(e.detail.current)
				// 切换到对应的tab上去，直接调用下方的函数
				this.changeTab(e.detail.current)
			},
			
			changeTab(index){
				if(this.tabIndex===index){
					return
				}
				// 把当前点击项的索引匹配上之后,在上方动态绑定:class添加点击后的样式
				this.tabIndex=index
				// 滚动到指定位置(要和上方的:id的值保持一致)
				this.scrollInto='tab'+index
			},
			//上拉加载更多
			loadmore(index){
				let item=this.listData[index]//匹配到当前页面的所有列表
				if(item.loadmore!=='上拉加载更多') return ;
				//修改当前页面的列表加载状态
				item.loadmore='加载中...'
				//模拟数据请求
				setTimeout(()=>{
					// 模拟请求出新的数据
					item.list=[...item.list,...item.list]
					// 恢复到加载更多
					item.loadmore='上拉加载更多'
				},2000)
			}
		}
	}
</script>

<style>
</style>
