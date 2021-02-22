var Mock = require('mockjs') // 导入mockjs
// 模拟一个列表数据
var arr = Mock.mock({
	"list|448": [  // 生成一个 length是 4~10之间的数组
		{
			"id|+1": 1, // 生成的id每次递增1
			"show": true,
			"count":0,
			"tu":''
		}
	]
})

// 获取列表数据的接口 第一个参数表示自定义的接口地址 第二个参数表示自定义的请求方法 
// 第三个参数是回调函数，定义返回的数据
Mock.mock('http://www.aaa.com', 'get', () => {
    return arr
})
