import React, { Component } from 'react';
import store from './store'
import { Table, Icon } from 'antd';
import './shop.less'

class ShopList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopList: store.getList()
		};
	}

	handleDelete(id) {
	  store.delShop(id);
	  this.reload();
  }

  reload() {
	  this.setState({
	    shopList: store.getList()
    })
  }

	render() {
    const columns = [
      {
        title: 'Shop Name',
        dataIndex: 'shopName',
        key: 'shopName'
      },
      {
        title: 'Brand',
        dataIndex: 'brandName',
        key: 'brandName'
      },
      {
        title: 'Address',
        key: 'address',
        render: (text, record) => (
          <span>
            {record.provinceName + record.cityName + record.districtName + record.address}
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href={"#/shop/view/" + record.shopId}>View</a>
            <span className="ant-divider"/>
            <a href={"#/shop/edit/" + record.shopId}>Edit</a>
            <span className="ant-divider"/>
            <a onClick={this.handleDelete.bind(this, record.shopId)}>Delete</a>
        </span>
        )
      }
    ];
		return <Table rowKey="shopId" columns={columns} dataSource={this.state.shopList}/>;
	}
}

export default ShopList;
