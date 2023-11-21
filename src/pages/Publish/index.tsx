import { createArticleAPI } from '@/apis/article';
import { useChannel } from '@/hooks/useChannel';
import { PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Upload,
  message,
  type UploadFile
} from 'antd';
import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Link } from 'react-router-dom';

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
  const { channelList } = useChannel();

  const onFinsh = (formValue: FormValue) => {
    const { title, channel_id, content } = formValue;
    if (imageList.length !== imageType) return message.warning('封面类型跟图片数量不匹配');
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item: UploadFile) => item.response.data.url)
      },
      channel_id
    };

    createArticleAPI(reqData);
  };

  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const onChange = (value: any) => {
    setImageList(value.fileList);
  };

  const [imageType, setImageType] = useState(0);
  const onTypeChange = ({ target: { value } }: any) => {
    setImageType(value);
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
          initialValues={{ type: 0 }}
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
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name="image"
                maxCount={imageType}
                onChange={onChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
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
