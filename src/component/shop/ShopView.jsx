import React, { Component } from 'react';
import store from './store'
class ShopView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const shop = store.getShop(this.props.params.id);
    return <table className="kb-detail-table-6">
      <tbody>
      <tr>
        <td className="kb-detail-table-label">品牌</td>
        <td>{shop.brandName || ''}</td>
        <td className="kb-detail-table-label">创建时间</td>
        <td>{shop.createTime ? format(new Date(shop.createTime)) : ''}</td>
        <td className="kb-detail-table-label">默认收款方式</td>
        <td>{shop.acquiringMethod || ''}</td>
      </tr>
      <tr>
        <td className="kb-detail-table-label">品类</td>
        <td>{shop.category || ''}</td>
        <td className="kb-detail-table-label">最后一次修改</td>
        <td>{shop.shopLastModified}</td>
        <td className="kb-detail-table-label">收款账户</td>
        <td>{shop.receiveLogonId || ''}</td>
      </tr>
      <tr>
        <td className="kb-detail-table-label">人均价格</td>
        <td>{shop.perPay ? shop.perPay + '元' : ''}</td>
        <td className="kb-detail-table-label">营业时间</td>
        <td>{shop.businessTime || ''}</td>
      </tr>
      <tr>
        <td className="kb-detail-table-label">机具编号</td>
        <td className="kb-detail-table-label">外部门店编号</td>
        <td>{shop.outShopId || ''}</td>
      </tr>
      <tr>
        <td className="kb-detail-table-label">门店联系方式</td>
      </tr>
      <tr>
        <td className="kb-detail-table-label">提供服务</td>
        <td>
          {shop.provideServs ? shop.provideServs.join(',') : ''}
        </td>
      </tr>
      <tr>
        <td className="kb-detail-table-label">更多服务</td>
        <td>{shop.otherService || ''}</td>
      </tr>
      </tbody>
    </table>
  }
}

export default ShopView;
