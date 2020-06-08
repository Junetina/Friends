<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar :statusBar='true'>
				<view class='flex w-100 justify-center align-center'>
					<view v-for='(item,index) in tabNav'
								:key='index'
								class='font-md mx-2 text-dark font-weight-bold'
								:class='tabIndex===index?"text-main h3":""'
								@click='changeTab(index)'>{{item.name}}</view>
				</view>
				<view slot='right' @click='gotoEdit'>
					<text class='iconfont icon-fatie_icon font-lg'></text>
				</view>
		</uni-nav-bar>
		
		<!-- 主体内容 -->
		<swiper :duration="150"
						:current="tabIndex"
						@change="swiperItemChange"
						:style='"height:"+mainHeight+"px;"'>
			<!-- 关注 -->
			<swiper-item>
				<scroll-view  scroll-y
											:style='"height:"+mainHeight+"px;"'>
					<block v-for='(item,index) in list'
								:key='index'>
								<common-list  :item='item' 
															:index='index' 
															@doSupport='doSupport'>
								</common-list>				
							<!-- 分割线组件 -->
							<divider></divider>
					</block>
					<load-more :loadmore='loadMoreEvent'></load-more>
				</scroll-view>
			</swiper-item>
			
			
			<!-- 话题部分 -->
			<swiper-item>
				<scroll-view  scroll-y
											:style='"height:"+mainHeight+"px;"'>
					<!-- 热门分类 -->
					<hot-cate :hotCate='hotCate'></hot-cate>
					<!-- 搜索话题 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-center py-2 text-secondary" @click="openSearch">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" 
									:indicator-dots="true" 
									:autoplay="true" 
									:interval="3000" :duration="1000">
						<swiper-item>
							<image src="/static/demo/banner3.jpg"
												style="height: 300rpx;" 
												class="w-100 rounded">
							</image>
						</swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新 话题列表组件-->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	const demo=[
		{
			username:'昵称',
			userpic:'../../static/default.jpg',
			newstime:'2019-07-01 下午4:22',
			isFollow:false,
			title:'测试封面图',
			titlepic:'',
			support:{
				type:'support',
				support_count:1,
				unsupport_count:2
			},
			comment_count:2,
			share_num:2
		},
		{
			username:'昵称',
			userpic:'../../static/default.jpg',
			newstime:'2019-07-01 下午4:22',
			isFollow:false,
			title:'测试封面图',
			titlepic:'../../static/bgimg/1.jpg',
			support:{
				type:'unsupport',
				support_count:1,
				unsupport_count:2
			},
			comment_count:2,
			share_num:2
		},
		{
			username:'昵称',
			userpic:'../../static/default.jpg',
			newstime:'2019-07-01 下午4:22',
			isFollow:false,
			title:'测试封面图',
			titlepic:'../../static/bgimg/1.jpg',
			support:{
				type:'',
				support_count:0,
				unsupport_count:0
			},
			comment_count:0,
			share_num:0
		}
	]
	
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/loadmore.vue'
	
	import  hotCate from '@/components/news/hot-cate.vue'
	import  topicList from '@/components/news/topic-list.vue'
	export default {
		components:{
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data(){
			return {
				list:[],
				mainHeight:550,
				tabIndex:0,
				tabNav:[
					{name:"关注"},
					{name:"话题"}
				],
				// 三种状态:1/上拉加载更多数据 2.加载中... 3.到底了~
				loadmore:'',
				hotCate:[
					{name:'关注'},
					{name:'推荐'},
					{name:'体育'},
					{name:'热点'},
					{name:'财经'},
					{name:'娱乐'}
				],
				topicList:[
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:res=>{
					this.mainHeight = res.windowHeight - res.statusBarHeight - 44
				}
			})
			//模拟请求到数据
			this.list = demo
		},
		methods:{
			//搜索话题
			openSearch(){
				uni.navigateTo({
					url:'../search/search?type=topic'
				})
			},
			//滑动切换到另一个tab
			swiperItemChange(e){
				// console.log(e)
				this.tabIndex = e.detail.current
			},
			// 切换Nav的tab标题
			changeTab(index){
				console.log(index)
				this.tabIndex = index 
			},
			//点击去发布
			gotoEdit(){
				uni.navigateTo({
					url:'../add-input/add-input'
				})
			},
			
			// 顶踩操作
			doSupport(e){	
				//拿到当前点击的对象,可进行打印
				let curItem =this.list[e.eIndex]
				// 给toast提示(有bug)
				// let msg = item.support.type==='support'?"支持成功":"返对成功";
				//判断 顶或踩已经存在的状态
				// 1.初始情况下,如果没有顶过也没有踩过,就直接在对应的类型的数据上加1,不用再进行其他的判断
				if(curItem.support.type===''){
					curItem.support[e.type+'_count']++
				}
				//2.如果目前的状态已经是顶过了,需要改成踩的状态，就可以进行将顶的数量-1，踩的数量+1；已经顶了再点击顶而不是踩，就无效果
				else if(curItem.support.type==='support' && e.type==='unsupport'){
					// debugger
					curItem.support.support_count--;
					curItem.support.unsupport_count++;
				}else if(curItem.support.type==='unsupport' && e.type==='support'){
					//3.如果目前的状态已经是踩过了,需要改成顶的状态，就可以进行将顶的数量+1，踩的数量-1；已经踩了再点击踩而不是顶，就无效果
					curItem.support.support_count++;
					curItem.support.unsupport_count--;
				}
				
				//4.更改type类型,在顶和踩中只能有一种颜色激活。
				//  配合子组件里面的:class进行三目运算再执行下方的active样式，当前点击项进行点击更改的操作
				curItem.support.type=e.type
			},
			
			//加载更多事件
			loadMoreEvent(){
				//判断是否已经处于加载事件状态中
				if (this.loadmore !=='上拉加载更多数据') return
				//更改加载状态
				this.loadmore = '加载中'
				//模拟请求数据
				setTimeout(()=>{
					this.list=[...this.list,...this.list]
					// 更改为初始状态
					this.loadmore ='上拉加载更多数据'
				})
			}
			
		}
	}
</script>

<style>
</style>
