// 壁纸资讯公告列表 mock
export const wallNewsListMock = {
	errCode: 0,
	errMsg: "查询成功",
	data: [{
			_id: "65360ea7bd0220d7635bd34b",
			view_count: 99509,
			publish_date: 1698041511788,
			title: "松桐壁纸，版权公告",
			author: "HankNovic",
			select: true
		},
		{
			_id: "653507c6466d417a3718e94b",
			view_count: 235168,
			publish_date: 1697974214505,
			title: "欢迎关注咸虾米圈子公众号，获取最新动态。",
			author: "咸虾米",
			select: true
		},
		// 因为没有根据请求信息挑选出置顶内容功能,手动注释
		// {
		// 	_id: "6536358ce0ec19c8d67fbe82",
		// 	view_count: 74373,
		// 	publish_date: 1698051468713,
		// 	title: "常见问题，自行排查",
		// 	author: "HankNovic",
		// 	select: false
		// },
		{
			_id: "65361e318b0da4ca084e3ce0",
			view_count: 10493,
			publish_date: 1698045489090,
			title: "关于我们，相关介绍",
			author: "HankNovic",
			select: true
		}
	],
	author: "接口管理员：B站咸虾米",
	timeCost: 23
}

// 壁纸资讯公告详情 mock
// 咸虾米壁纸，版权公告
export const wallNewsDetailMockA = {
	"errCode": 0,
	"errMsg": "查询成功",
	"data": {
		"_id": "65360ea7bd0220d7635bd34b",
		"view_count": 99509,
		"publish_date": 1766910431970,
		"article_status": 1,
		"title": "松桐壁纸，版权公告",
		"author": "HankNovic",
		"content": `
		<p>欢迎体验“松桐壁纸”小程序，用于测试用户体验及问题反馈。</p>
		<p><img src="/static/images/noticeA.jpg" style=\"max-width:100%;\" contenteditable=\"false\"/><br/><br/></p>
		<p>本项目学习自 UP 主咸虾米的开源项目，仅用于学习与交流。<br/><br/></p>
		<p>松桐壁纸内的图片资源来源于互联网或用户上传，版权归原作者所有。<br/><br/></p>
		<p>如发现内容侵权，请提供相关证明并联系处理，将第一时间删除。<br/><br/></p>
		<p>本项目为非商业用途，对可能造成的不便敬请谅解。</p>
		`,
		"select": true
	},
	"author": "接口管理员：B站咸虾米",
	"timeCost": 23
}

// 欢迎关注咸虾米圈子公众号，获取最新动态。
export const wallNewsDetailMockB = {
	errCode: 0,
	errMsg: "查询成功",
	data: {
		_id: "653507c6466d417a3718e94b",
		view_count: 541,
		publish_date: 1697974214505,
		article_status: 1,
		title: "欢迎关注咸虾米圈子公众号，获取最新动态。",
		author: "咸虾米",
		content: `<p><img src="https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/cloudstorage/69e3dd04-1bc0-4aaa-809c-e37cbb587d58.jpg" style="max-width:100%;" contenteditable="false"/></p>
		<p>扫码关注“咸虾米圈子”微信公众号，了解更多技术分享与项目动态。<br/><br/></p>
		<p>松桐壁纸项目学习自 UP 主咸虾米的相关开源内容，仅用于学习交流。</p>
		`,
		select: true
	},
	timeCost: 57
};

// 常见问题，自行排查
export const wallNewsDetailMockC = {
	"errCode": 0,
	"errMsg": "查询成功",
	"data": {
		"_id": "6536358ce0ec19c8d67fbe82",
		"view_count": 74373,
		"publish_date": 1766909518956,
		"article_status": 1,
		"title": "常见问题，自行排查",
		"author": "HankNovic",
		"content": `
		<h3>📌 壁纸是否可以免费下载使用？</h3>
		<p>松桐壁纸内的所有图片均可免费下载，仅限个人学习与欣赏使用，不得用于商业用途。</p>
		<p><br/></p>
		<h3>📌 下载提示请求频繁？</h3>
		<p>为防止误操作及恶意请求，同一张壁纸短时间内无法重复下载。</p>
		<p><br/></p>
		<h3>📌 图片加载缓慢或无法显示？</h3>
		<p>图片较大时受网络环境影响，请耐心等待或重新进入查看。</p>
		<p><br/></p>
		<h3>📌 如果发现侵权内容？</h3>
		<p>图片来源于网络，如有侵权请反馈处理。</p>
		<p><br/></p>
		<p><br/></p>
		<p>说明：松桐壁纸项目学习自 UP 主咸虾米的开源项目，仅用于学习交流。</p>
		`,
		"select": false
	},
	"author": "接口管理员：B站咸虾米",
	"timeCost": 30
}

// 关于我们，相关介绍
export const wallNewsDetailMockD = {
	"errCode": 0,
	"errMsg": "查询成功",
	"data": {
		"_id": "65361e318b0da4ca084e3ce0",
		"view_count": 10493,
		"publish_date": 1766909518956,
		"article_status": 1,
		"title": "关于我们，相关介绍",
		"author": "HankNovic",
		"content": `
		<p>松桐壁纸是一个用于学习与实践的小程序项目。<br/><br/></p>
		<p>本项目学习自 B 站 UP 主「咸虾米」的开源壁纸项目，用于技术学习与交流。<br/></p>
		<p><img src="/static/images/noticeD.jpg"/><br/><br/></p>
		<p>项目中的图片资源来源于网络或用户上传，使用壁纸请标明出处，请勿用于任何商业用途！<br/><br/></p>
		<p>如涉及侵权内容，请联系处理，将及时删除。<br/><br/></p>
		<p>感谢原作者与社区的支持!</p>
		`,
		"select": true
	},
	"author": "接口管理员：B站咸虾米",
	"timeCost": 23
}