<template>
	<view class="content">
		<!-- 顶部tab选项卡切换 -->
		<scroll-view  scroll-x
									style='height:100rpx;'
									:scroll-into-view='scrollInto'
									scroll-with-animation
									class='scroll-row border-bottom border-light-secondary font-md'>
			<block v-for='(item,index) in tabLi'>
				<view :key='index'
							:id='"tab"+index'
							@click="changeTab(index)"
							:class='tabIndex==index?"text-main font-lg font-weight-bold":""'
							class='scroll-row-item py-3 px-3'>{{item.name}}</view>
			</block>
		</scroll-view>
		<!-- 主体内容切换 -->
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
							<!-- 引用公共列表组件 -->
							<view>
								<topic-list :item='item2' 
														:index='index2' ></topic-list>						
							<!-- 分割线组件 -->
							<divider></divider>
							</view>
						</block>
						<!-- 上拉加载组件 -->
						<load-more :loadmore='item.loadmore'></load-more>
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
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/common/loadmore.vue'
	
	const demo=[
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
	export default {
		components: {
			topicList,
			loadMore
		},
		data() {
			return {
				//主体内容窗口的高度
				mainHeight:800,
				// 顶部选项卡
				tabIndex:0,
				scrollInto:'',
				tabLi:[
					{
						name:'关注'
					},
					{
						name:'推荐'
					},
					{
						name:'体育'
					},
					{
						name:'热点'
					},
					{
						name:'财经'
					},
					{
						name:'历史'
					},
					{
						name:'关注'
					},
					{
						name:'关注'
					},
					{
						name:'关注'
					},
					{
						name:'关注'
					},
					{
						name:'关注'
					}
					
				],
				listData:[]
			}
		},
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url: '../search/search'
			});
		},
		//监听导航栏右侧图标按钮
		onNavigationBarButtonTap(){
			console.log(1)
			uni.navigateTo({
				url: '../add-input/add-input'
			})
		},
		onLoad(){
			let res = uni.getSystemInfo({
				success: function (res) {
				this.mainHeight=res.windowHeight - uni.upx2px(101)
			}
		})
		
		//页面加载就获取数据
		this.getData()
		},
		methods: {
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
			
			// 顶部切换tab
			changeTab(index){
				// console.log(index)
				if(this.tabIndex===index){
					return
				}
				// 把当前点击项的索引匹配上之后,在上方动态绑定:class添加点击后的样式
				this.tabIndex=index
				// 滚动到指定位置(要和上方的:id的值保持一致)
				this.scrollInto='tab'+index
			},
			
			// 关注事件
			followEvent(eIndex){
				console.log(eIndex);
				let curItem=this.loopListData()
				this.curItem[eIndex].isFollow = true
				uni.showToast({
					title:"关注成功"
				})
			},
			
			//循环listData的每一项,可重复使用的函数
			loopListData(){
				let item = null
				for (let i=0;i<this.listData.length;i++) {
					item = this.listData[i]
					// 每个对象里面都对应有一个list:{}
					return item.list
				}
				console.log(item)
			},
			
			// 顶踩操作
			doSupport(e){	
				//拿到当前点击的对象,可进行打印
				let curItem =this.loopListData()[e.eIndex]
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
