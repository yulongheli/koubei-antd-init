import React, {Component} from 'react';
import store from './store';
import { transformLCV } from '../../common/treeUtil';
import ShopEntity from './ShopEntity';
import Picture from './Picture';
import brands from './data/brands';
import areas from './data/areas';

import {
  Form,
  Input,
  Radio,
  Tooltip,
  Icon,
  Cascader,
  Select,
  TreeSelect,
  Row,
  Col,
  Checkbox,
  Button,
  Upload,
  Modal
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;

class ShopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false
    };
    this.isEdit = /shop\/edit/.test(this.props.route.path);
    if (this.isEdit) {
      this.shop = store.getShop(this.props.param.id);
    } else {
      this.shop = new ShopEntity();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    this.setState({
      submitting: true
    });
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(this.shop, values);
        if (this.isEdit) {
          store.saveShop(this.shop.shopId, this.shop);
        } else {
          store.addShop(this.shop);
        }
        this.props.router.push('shop/list');
      } else {
        this.setState({
          submitting: false
        })
      }
    })
  }

  handleBrandSelect(value, option) {
    this.shop.brandId = value;
    this.shop.brandName = option.props.title;
  }

  handleResidenceChange(value, options) {
    [this.shop.provinceId, this.shop.cityId, this.shop.distinctId] = value;
    this.shop.provinceName = options[0].n;
    this.shop.cityName = options[1].n;
    this.shop.distinctName = options[2] ? options[2].n : '';
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...formItemLayout}
          required
          label="Brand Name">
          {
            getFieldDecorator('brandId', {
              rules: [{
                required: true
              }]
            })(
              <Select
                showSearch
                onSelect={this.handleBrandSelect.bind(this)}
                placeholder="select a brand"
                optionFilterProp="title"
              >
                {brands.map(b => <Option key={b.id} title={b.name}>{b.name}</Option>)}
              </Select>
            )
          }

        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="Shop Name">
          {
            getFieldDecorator('shopName', {
              rules: [{
                required: true, message: 'Please input shop name.'
              }]
            })(
              <Input style={{width: '50%'}} placeholder="e.g. 海底捞"/>
            )
          }
          <p className="shop-form-extra">
            <span className="warnning">请勿填错格式，导致开店失败。</span>
            正确示例如下：
            <br/>1.老何炒面: 主店名=老何炒面，分店名不填
            <br/>2.肯德基(大学城店): 主店名=肯德基，分店名=大学城店
            <br/>3.兰州拉面(人民美食广场): 主店名=兰州拉面，分店名=人民美食广场
            <br/><span className="warnning">括号不需要填写</span>
          </p>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="Location"
        >
          {
            getFieldDecorator('residence', {
              rules: [{
                required: true
              }]
            })(
              <Cascader
                options={transformLCV(areas)}
                onChange={this.handleResidenceChange.bind(this)}
              />
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="Shop Tel"
        >
          <InputGroup>
            <Col span="3">
              <FormItem>
                {
                  getFieldDecorator('mobileNo1', {
                    validateFirst: true,
                    rules: [{
                      required: true,
                      message: '此项必填'
                    }]
                  })(
                    <Input/>
                  )
                }
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem>
                {
                  getFieldDecorator('mobileNo2', {})(
                    <Input/>
                  )
                }
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem>
                {
                  getFieldDecorator('mobileNo3', {})(
                    <Input/>
                  )
                }
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem>
                {
                  getFieldDecorator('mobileNo4', {})(
                    <Input/>
                  )
                }
              </FormItem>
            </Col>
          </InputGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="Charge Method"
        >
          {
            getFieldDecorator('payType', {
              initialValue: 1
            })(
              <RadioGroup>
                <Radio value={1}>顾客自动买单</Radio>
                <Radio value={2}>商家扫码买单</Radio>
              </RadioGroup>
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Brand Logo"
          required
        >
          <Picture/>
          <p className="shop-form-extra"><span className="warnning">仅支持上传一张，LOGO将在支付宝-口碑页面展示。</span>不可有水印、须实景图，如上传装修效果图则将被驳回。不超过10M，格式：bmp，png，jpeg，gif。建议尺寸在500px＊500px以上（更容易通过审核）
          </p>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="Receiver ID"
        >
          {
            getFieldDecorator('receiveUserId', {
              rules: [{
                required: true
              }]
            })(
              <Input/>
            )
          }
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.submitting}>Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(ShopForm);
