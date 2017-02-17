import { STORAGE_KEYS } from './config';
import StorageUtil from '../../common/StorageUtil';

const getList = () => {
	const index = StorageUtil.getItem(STORAGE_KEYS.KB_SHOP_LIST_INDEX);
	return index.map(id => StorageUtil.getItem(STORAGE_KEYS.KB_SHOP_PRE + id));
}
const saveList = (data) => {
	StorageUtil.setItem(STORAGE_KEYS.KB_SHOP_LIST_INDEX, data);
}
const getShop = (id) => {
	return StorageUtil.getItem(STORAGE_KEYS.KB_SHOP_PRE + id);
}
const addShop = (data) => {
	StorageUtil.setItem(STORAGE_KEYS.KB_SHOP_LIST_INDEX + data.shopId, data);
	const list = getList();
	list.push(data.shopId);
	saveList(list);
}
const saveShop = (id, data) => {
	StorageUtil.setItem(STORAGE_KEYS.KB_SHOP_PRE + id, data);
}
const delShop = (id) => {
	StorageUtil.delItem(STORAGE_KEYS.KB_SHOP_PRE + id);
	const list = getList();	
	for (let i = 0; i < list.length; i++) {
		if (list[i] === id) {
			list.splice(i, 1);
			break;
		}
	}
	saveList(list);
}
const initList = () => {
	if (!getList()) {
		StorageUtil.setItem(STORAGE_KEYS.KB_SHOP_LIST_INDEX, []);	
	}
}

export default {
	initList,
	getList,
	getShop,
	saveShop,
	delShop
}