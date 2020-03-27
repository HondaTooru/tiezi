import service from '@/utils/service'

export function getIndexCate () {
	return service.post('/ebapi/placard_api/placard_index')
}

export function placardList (data) {
	return service.post('/ebapi/placard_api/placard_list', data)
}

export function myData () {
	return service.post('/ebapi/placard_user_api/my')
}

export function SetCode (data) {
	return service.post('/ebapi/Login/setCode', data)
}

export function login (data) {
	return service.post('/ebapi/login/index', data)
}

// placard_id, id
export function commentList (data) { // 评论列表
	return service.post('/ebapi/placard_api/commentList', data)
}
// placard_id, pid, content
export function addComment (data) { // 添加评论
	return service.post('/ebapi/placard_user_api/addComment', data)
}

export function placardInfo (data) { // 帖子详情
	return service.post('/ebapi/placard_api/placard_info', data)
}

export function getMy (data, header) { // 个人信息
	return service.post('/ebapi/user_api/my', data, header)
}

export function readyFab (data, header) { // 点赞
	return service.post('/ebapi/placard_user_api/placard_fab', data, header)
}

export function addfavorite (data, header) { // 收藏
	return service.post('/ebapi/placard_user_api/startIndustry', data, header)
}

export function addCom (data, header) {  // 添加评论
	return service.post('/ebapi/placard_user_api/addComment', data, header)
}

export function palacardInfo (data) { // 帖子详情
	return service.post('/ebapi/placard_api/placard_info', data)
}

export function getComment (data) { // 删除评论
	return service.post('/ebapi/placard_api/commentList', data)
}

export function delComment (data, header) { // 删除评论
	return service.post('/ebapi/placard_user_api/delComment', data, header)
}

export function placardCate (data) { // 查询某个行业的二级分类
	return service.post('/ebapi/placard_api/placard_cate', data)
}

export function placardRanking (data) { // 列表数据
	return service.post('/ebapi/placard_api/placard_ranking', data)
}

export function MakeFriends (data, header) { // 本地交友发帖
	return service.post('/ebapi/placard_user_api/submit_make_friends', data, header)
}

export function lookCar (data, header) { // 人货找车发帖
	return service.post('/ebapi/placard_user_api/submit_look_char', data, header)
}

export function postShop (data, header) { // 发布店铺
	return service.post('/ebapi/placard_user_api/submit_shop', data, header)
}

export function postVillage (data, header) { // 农村特产发帖
	return service.post('/ebapi/placard_user_api/submit_farm_specialty', data, header)
}

export function postRent (data, header) { // 房租租卖发帖
	return service.post('/ebapi/placard_user_api/submit_rent_sale', data, header)
}

export function postInvite (data, header) { // 招聘发帖
	return service.post('/ebapi/placard_user_api/submit_recruit', data, header)
}

export function postUsed (data, header) { //二手市场发帖
	return service.post('/ebapi/placard_user_api/submit_second_hand', data, header)
}

export function postService (data, header) { // 服务到家发帖
	return service.post('/ebapi/placard_user_api/submit_service_home', data, header)
}

export function postHelp (data, header) { // 求助打听发帖 
	return service.post('/ebapi/placard_user_api/submit_asking_help', data, header)
}

export function postTaxi (data, header) { // 靓车发帖
	return service.post('/ebapi/placard_user_api/submit_car_rental', data, header)
}

export function postSkill (data, header) { // 技能发帖
	return service.post('/ebapi/placard_user_api/submit_unique_skills', data, header)
}

export function postLove (data, header) { //爱心公益发帖
	return service.post('/ebapi/placard_user_api/submit_love_welfare', data, header)
}

export function MyData (data, header) { // 我发表的帖子
	return service.post('/ebapi/placard_user_api/placard_user', data, header)
}

export function MyList (data, header) { // 收藏的帖子
	return service.post('/ebapi/placard_user_api/user_collect', data, header)
}

export function delCollect (data ,header) { // 删除收藏
	return service.post('/ebapi/placard_user_api/del_user_collect', data, header)
}

export function delPost (data, header) { // 删除帖子
	return service.post('/ebapi/placard_user_api/del', data, header)
}

export function uploadImg (data, header) { // 上传图片
	return service.post('/ebapi/public_api/upload', data, header) 
}

export function MyProductList (data) {
	return service.post('/ebapi/placard_api/product_list', data)
}

export function SubmitProduct (data, header) {
	return service.post('/ebapi/placard_user_api/submit_product', data, header)
}

export function DelProdcut (data, header) {
	return service.post('/ebapi/placard_user_api/del_product', data, header)
}

export function UserShop (data, header) {
	return service.post('/ebapi/placard_user_api/get_user_shop', data, header)
}