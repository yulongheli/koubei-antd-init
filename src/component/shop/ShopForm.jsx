import React, {Component} from 'react';
import store from './store';
import {transformLCV} from '../../common/treeUtil';
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
    super(props)
    this.isEdit = /shop\/edit/.test(this.props.route.path);
  }

  handleSubmit() {

  }

  render() {
    const {getFieldDecorator} = this.props.form;

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
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          required
          label="Brand Name">
          {
            getFieldDecorator('brandId', {})(
              <Select
                showSearch
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
              <Input style={{width: '50%'}} placeholder="e.g. 海底捞" required/>
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
            getFieldDecorator('residence', {})(
              <Cascader options={transformLCV(areas)}/>
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
              <Input/>
            </Col>
            <Col span="3">
              <Input/>
            </Col>
            <Col span="3">
              <Input/>
            </Col>
            <Col span="3">
              <Input/>
            </Col>
          </InputGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="Charge Method"
        >
          <RadioGroup value={1}>
            <Radio value={1}>顾客自动买单</Radio>
            <Radio value={2}>商家扫码买单</Radio>
          </RadioGroup>
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
          label="Alipay Account"
        >
          <Input/>
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(ShopForm);
