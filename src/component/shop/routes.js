import ShopList from './ShopList';
import ShopForm from './ShopForm';
import ShopView from './ShopView';

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
    path: 'shop/view/:id',
    component: ShopView
  },
	{
		path: 'shop/add',
		component: ShopForm
	}
];
