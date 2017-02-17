import { sillyRandomId } from '../../common/utils';
const EmptyShop = {
	"address":"上海市浦东新校区民生路1199弄",
	"bdNickName":"",
	"bdRealName":"",
	"brokerName":"",
	"brokerStaff":"",
	"category":"",
	"cityName":"上海市",
	"competitorDis":"",
	"createTime":1484275629000,
	"districtName":"浦东新区",
	"mallId":"",
	"mallName":"",
	"merchantName":"cc123",
	"merchantPid":"2088102146931393",
	"mobile":"18888888888",
	"orderId":"",
	"provinceName":"上海",
	"qualityScore":"0",
	"shopId":"",
	"shopName":"headShopName_1484275571411(shopName)",
	"shopType":"COMMON",
	"status":"OPEN",
}
export default class ShopEntity {
	constructor(options) {
		Object.assign(this, EmptyShop, options, {
			shopId: sillyRandomId()
		});
	}	
}