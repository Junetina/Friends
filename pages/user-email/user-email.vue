<template>
	<view>
		<view>
			<input class="uni-input py-2 border-bottom" type="text" 
					placeholder="请输入你要绑定的邮箱" v-model="email"/>
			<input class="uni-input py-2 border-bottom" type="text" 
					placeholder="请输入密码" v-model="password"/>
				
			<view class="py-2 px-3 my-4">
				<button class="bg-main text-white"
								style="border-radius: 50rpx;border: 0;"
								:disabled="disabled"
								 @click='submit'
								:class='disabled?"bg-main-disabled":""'>
							完成
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				password:''
			}
		},
		computed:{
			disabled(){
				return this.email=='' || this.password==''
			}
		},
		methods: {
			//验证
			check(){
				let rule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				console.log(rule.test(this.email))
				if(!rule.test(this.email)){
					uni.showToast({
						icon:'none',
						title:'请输入正确格式的邮箱'
					})
					return false
				}
				return true
			},
			
			submit(){
				if(!this.check()){
					return 
				}
				console.log('提交成功')
			}
		}
	}
</script>

<style>

</style>
