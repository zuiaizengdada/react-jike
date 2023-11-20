import { createArticleAPI, getChannelAPI } from '@/apis/article';
import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload } from 'antd';
import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Link } from 'react-router-dom';

interface Channel {
  id: number;
  name: string;
}

interface FormValue {
  channel_id: number;
  content: string;
  title: string;
  cover?: {
    type?: number;
    images?: any[];
  };
}

const Publish = () => {
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();

      setChannelList(res.data.channels);
    };

    getChannelList();
  }, []);

  const onFinsh = (formValue: FormValue) => {
    const { title, channel_id, content } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id
    };

    createArticleAPI(reqData);
  };

  const [imageList, setImageList] = useState([]);
  const onChange = (value: any) => {
    setImageList(value.fileList);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              {
                title: '发布文章'
              }
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinsh}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入文章标题'
              }
            ]}
          >
            <Input
              placeholder="请输入文章标题"
              style={{
                width: 400
              }}
            />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name="image"
              onChange={onChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
