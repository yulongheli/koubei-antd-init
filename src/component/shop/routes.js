import ShopList from './ShopList';
import ShopForm from './ShopForm';

export default [
	{
		path: 'shop/list',
		component: ShopList
	},
	{
		path: 'shop/edit/:id',
		component: ShopForm
	},
	{
		path: 'shop/add',
		component: ShopForm
	}
];