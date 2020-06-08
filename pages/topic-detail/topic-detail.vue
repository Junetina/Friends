<template>
	<view>
		<!-- 顶部话题信息组件 -->
		<topic-info :info='info'></topic-info>
		<divider></divider>
		<!-- 热点新闻 -->
		<view class="p-2 flex align-center border-bottom"
		hover-class="bg-light" v-for="(item,index) in hotList"
		:key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font text-dark text-ellipsis ">
				{{item.title}}
			</text>
		</view>
		<divider></divider>
		
		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center"
						v-for="(item,index) in tabLi" :key="index"
						style='height:100rpx;'
						:class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md'"
						@click="changeTab(index)">{{item.name}}</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<divider></divider>
			</block>
		</template>
		<template v-else>
			<nothing></nothing>
		</template>
		<!-- 上拉加载 -->
		<load-more :loadmore="loadtext"></load-more>
		
		
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
	
	import topicInfo from '@/components/topic-detail/topic-info.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/loadmore.vue'
	export default {
		components:{
			topicInfo,
			commonList,
			loadMore
		},
		onLoad(e) {
			// console.log(e.detail)
			// this.info = JSON.parse(e.detail)
			this.list1=demo
			this.list2=demo
		},
		//监听触底事件
		onReachBottom(){
			// console.log('上拉加载更多')
			this.loadmore()
		},
		data(){
			return{
				tabIndex:0,
				info:{
							cover: "/static/demo/topicpic/1.jpeg",
							title: "话题名称",
							desc: "话题描述",
							today_count: 0,
							news_count: 10
				},
				hotList:[{
					title:"【新人必读】uni-app实战第二季商城类项目开发"
				},{
					title:"【新人必读】uni-app实战第三季仿微信项目开发"
				}],
				tabLi:[{
					name:"默认"
				},{
					name:"最新"
				}],
				// 默认
				list1:[],
				loadtext1:"上拉加载更多",
				page1:1,
				firstLoad1:false,
				// 最新
				list2:[],
				loadtext2:"上拉加载更多",
				page2:1,
				firstLoad2:false
			}
		},
		computed:{
			// 当前列表数据
			listData() {
				if (this.tabIndex === 0) {
					return this.list1
				}
				return this.list2
			},
			// 当前上拉加载
			loadtext(){
				if (this.tabIndex === 0) {
					return this.loadtext1
				}
				return this.loadtext2
			}
		},
		methods:{
			changeTab(eIndex){
				this.tabIndex=eIndex
			},
			
			//上拉加载更多
			loadmore(){
				let index = this.tabIndex
				if(this.loadtext!=='上拉加载更多') return;
				//更改状态
				this['loadtext'+(index+1)]='加载中...'
				//请求数据
				setTimeout(()=>{
					this['list'+(index+1)]=[...this['list'+(index+1)],...this['list'+(index+1)]]
					
					this['loadtext'+(index+1)]='上拉加载更多'
				},2000)
			}
		}
	}
</script>

<style>
</style>
