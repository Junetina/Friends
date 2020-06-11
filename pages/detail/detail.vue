<template>
	
	<view>
		<common-list  :item='info' 
									isDetail 
									@doShare='doShare' 
									@doComment='doComment' 
									@followEvent='followEvent'
									@doSupport='doSupport'>
				<view class='font-sm'>{{info.content}}</view>
				<view>
					<image v-for='(item,index) in images'
								class='w-100'
								mode='widthFix'
								:key='index' 
								:src='item.url' 
								@click="preview(index)"></image>
				</view>
			</common-list>
			
			<divider></divider>
			<view class='px-2'>
				<view class='font-lg text-dark font-weight-bold  py-2'>最新评论 {{info.comment_count}}</view>
				<block v-for='(item2,index2) in commentList' :key='index2'>
					<view class="uni-comment-list font-md">
						    <view class="uni-comment-face">
									<!-- https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png -->
						        <image :src="item2.user.userpic | defaultUserPic" mode="widthFix"></image>
						    </view>
						    <view class="uni-comment-body">
						        <view class="uni-comment-top">
						            <text>{{item2.user.username}}</text>
						        </view>
						        <view class="uni-comment-content">{{item2.data}}</view>
						        <view class="uni-comment-date">
						            <view>2天前</view>
						       	</view>
						
								</view>
					</view>
				</block>
					
				
			</view>
			
			<view style='height:100rpx;'></view>
			<bottom-input @submit='submit'></bottom-input>
			
			<share-more ref='share'></share-more>
	</view>
</template>

<script>
	
	
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	import shareMore from '@/components/common/share-more.vue'
	export default {
		components:{
			commonList,
			bottomInput,
			shareMore
		},
		data(){
			return {
				info:{
					id:0,
					user_id:0,
					username:'',
					userpic:'',
					newstime:0,
					isFollow:false,
					title:'测试封面图',
					content:'',
					titlepic:'',
					support:{
						type:'unsupport',
						support_count:0,
						unsupport_count:0
					},
					comment_count:0,
					share_num:0
				},
				images:[
					{
					url:"https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg"
					},
					{
					url:"https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/5.jpg"
					}
				],
				//评论列表
				commentList:[]
			}
		},
		onLoad(e) {
			//初始化数据，由点击首页的任意详情列表跳转过来，并携带一个详情列表的对象作为参数传过来
			this.__init(JSON.parse(e.detail))
			
		},
		computed:{
			imageList(){
				return this.images.map(item=>item.url)
			}
		},
		filters:{
			defaultUserPic(value){
				if(value === null) return 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png'
			}
		},
		methods:{
			__init(data){
				//修改标题 
				uni.setNavigationBarTitle({
					title:data.title
				})
				//将commonlist组件里面的item对象通过url传输过来并接收渲染部分数据
				console.log(data)
				this.info = data
				let id = this.info.id
				//获取文章详情
				this.$H.get('/post/'+id)
				.then(res=>{
					console.log(res)
					this.info.content = res.detail.content
					this.images = res.detail.images
				})//end .then
				
				// 获取文章评论列表
				this.$H.get('/post/'+id+'/comment')
				.then(res=>{
					this.commentList = res.list
				})//end .then
			},
			
			//点击评论
			doComment(){
				console.log('点击评论')
			},
			//监听导航栏更多按钮
			onNavigationBarButtonTap(){
				this.$refs.share.open()
			},
			//监听返回键
			onBackPress(){
				this.$refs.share.close()
			},
			//点击分享
			doShare(){
				console.log('点击分享')
			},
			//点击关注
			followEvent(){
				this.info.isFollow = true
				uni.showToast({
					title:'关注成功'
				})
			},
			//点击发送对话
			submit(data){
				console.log(data)
				// 	let obj={
				// 		user_id:1,
				// 		avatar:'/static/default.jpg',
				// 		username:'昵称',//以上三个信息在本地缓存去取
				// 		data:data, 
				// 		type:'text',//image video audio
				// 		create_time:(new Date()).getTime()
				// 	}
					
				// 	this.list.push(obj)
				
				// 	this.pageToBottom()
					
			},
			
			//顶踩事件
			doSupport(e){
				//一、已经点击过同样类型的了
				if(this.info.support.type===e.type){
					uni.showToast({
						icon:'none',
						title:'你已经点击过了'
					})
				}
				
				// 二、点击的不是一个类型的情况下：判断 顶或踩已经存在的状态
				// 1.初始情况下,如果没有顶过也没有踩过,就直接在对应的类型的数据上加1,不用再进行其他的判断
				if(this.info.support.type===''){
					this.info.support[e.type+'_count']++
				}
				//2.如果目前的状态已经是顶过了,需要改成踩的状态，就可以进行将顶的数量-1，踩的数量+1；已经顶了再点击顶而不是踩，就无效果
				else if(this.info.support.type==='support' && e.type==='unsupport'){
					// debugger
					this.info.support.support_count--;
					this.info.support.unsupport_count++;
				}else if(this.info.support.type==='unsupport' && e.type==='support'){
					//3.如果目前的状态已经是踩过了,需要改成顶的状态，就可以进行将顶的数量+1，踩的数量-1；已经踩了再点击踩而不是顶，就无效果
					this.info.support.support_count++;
					this.info.support.unsupport_count--;
				}
				
				//4.更改type类型,在顶和踩中只能有一种颜色激活。
				//  配合子组件里面的:class进行三目运算再执行下方的active样式，当前点击项进行点击更改的操作
				this.info.support.type=e.type
			},
			
			//预览图片
			preview(index){
				uni.previewImage({
					//当前传的这一张
					current:index,
				  urls: this.imageList,
				});
			}
		}
		
	}
</script>

<style>
</style>
