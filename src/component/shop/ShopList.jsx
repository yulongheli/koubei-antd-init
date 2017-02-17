import React, { Component } from 'react';
import store from './store'
import './shop.less'

class ShopList extends Component {
	constructor(props) {
		super(props)
		store.initList();
		this.state = {
			shopList: store.getList()
		}
	}

	render() {
		return '';
	}
}

export default ShopList;
