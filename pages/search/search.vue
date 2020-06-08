<template>
	<view>
		<!-- 搜索历史 -->
		<template v-if='searchList.length<=0'>
			<view class='font-md px-2'>搜索历史</view>
			<view class='flex flex-wrap py-2 px-2'>
				<block v-for='(item,index) in historyData' :key='index'>
					<view class='px-2 font border border-secondary rounded text-secondary mx-2 my-2'
								@click="seachHistory(item.value)"
								hover-class='bg-light'>
								{{item.value}}
					</view>
				</block>
			</view>
		</template>
		
		<!-- 搜索后的数据列表展示 引入common-list组件-->
		<template v-else>
			<block v-for='(item1,index1) in searchList' :key='index1'>
				<!-- 帖子 -->
				<template v-if='type==="post"'>
					<common-list  :item='item1' :index='index1'></common-list>
				</template>
				
				<!-- 话题 -->
				<template v-else-if='type==="topic"'>
					<topic-list  :item='item1' :index='index1'></topic-list>
				</template>
				
				<!-- 增加好友 -->
				<template v-else-if='type==="addfriend"'>
					<user-list  :item='item1' :index='index1'></user-list>
				</template>
				<!-- 用户 --> 
				<template v-else='type==="user"'>
					<user-list   :item='item1' :index='index1'></user-list>
				</template>
				
			</block>
		</template>
	</view>
</template>

<script>
	const demo1=[
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
	const demo2 =[
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
	const demo3=[
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
	
	import commonList from '@/components/common/common-list.vue'
	import topicList from '@/components/news/topic-list.vue'
	import userList from '@/components/user-list/user-list.vue'
	export default {
		components:{
			commonList,
			topicList,
			userList
		},
		data(){
			return {
				searchText:'',
				historyData:[
					{id:1,
					value:"uniapp学习"
					},
					{id:2,
					value:"java学习"
					},
					{id:3,
					value:"前端学习"
					},
					{id:4,
					value:"ui学习"
					},
					{id:5,
					value:"大数据学习"
					},
					{id:6,
					value:"office学习"
					},
					{id:7,
					value:"说话技巧学习"
					},
					{id:8,
					value:"动画学习"
					},
					{id:9,
					value:"摄影学习"
					},
					{id:10,
					value:"财务学习"
					}
				],
				searchList:[],
				type:'post'
			}
		},
		//监听输入有改变的时候,可以获取输入值
		onNavigationBarSearchInputChanged(e){
			// 将输入的值先暂时存到data里面
			this.searchText=e.text
		},
		onLoad(e){
			if(e.type){
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type){
				case 'post':
				pageTitle = '帖子'
					break;
				case 'user':
				pageTitle = '用户'
					break;
				case 'addfriend':
				pageTitle = '好友'
					break;
				case 'topic':
				pageTitle = '话题'
					break;
			}
			
			//搜索占位字段
			 // #ifdef APP-PLUS
				let currentWebview = this.$mp.page.$getAppWebview()
				let tn = currentWebview.getStyle().titleNView
				tn.searchInput.placeholder = '搜索'+pageTitle
				currentWebview.setStyle({
					titleNView:tn
				})
			// #endif

		},
		//再监听点击了右上角搜索按钮,可以得到整个搜索按钮的信息的对象，里面的索引可以判断它是否是搜索按钮，因为导航栏里面的其他按钮会有其他定义的索引=>如果是搜索按钮，就要执行 搜索这个事件
		onNavigationBarButtonTap(e){
			if(e.index===0){
				this.searchEvent()
			}
		},
		onNavigationBarSearchInputConfirmed(e){
			console.log(e.text)
			//调取接口 展示数据
		},
		methods:{
			// 搜索事件
			searchEvent(){
				//隐藏起软键盘
				uni.hideKeyboard()
				//出现loading效果，模拟等待时间
				uni.showLoading({
					title:"加载中..."
				})
				//发送请求，获取搜索后的结果，通过计时器模拟异步请求
				setTimeout(()=>{
					//将搜索到的结果赋值给定义的searchList这个容器，进行页面渲染
					// this.searchList = demo
					switch (this.type){
						case 'post':
						this.searchList=demo1	
							break;
						case 'addfriend':
						this.searchList=demo2	
							break;
						case 'user':
						this.searchList=demo2	
							break;
						case 'topic':
						this.searchList=demo3	
							break;
					}

					uni.hideLoading()
				},2000)
			},
			
			//点击搜索历史的文字
			seachHistory(text){
				// console.log(text)
				// 将这个文字赋值给searchText 再执行搜索事件
				this.searchText=text
				//文字回传给后台
				this.searchEvent()
			}
		}
	}
</script>

<style>
</style>
