import { Breadcrumb, Button, Card, DatePicker, Form, Radio, Select, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import img404 from '@/assets/error.png';

import locale from 'antd/es/date-picker/locale/zh_CN';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useChannel } from '@/hooks/useChannel';
import { useEffect, useState } from 'react';
import { getArticleListAPI } from '@/apis/article';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface DataType {
  id: string;
  comment_count: number;
  cover: {
    images: never[];
  };
  like_count: number;
  pubdate: string;
  read_count: number;
  status: number;
  title: string;
}

interface ReqData {
  status: string;
  channel_id: string;
  begin_pubdate: string;
  end_pubdate: string;
  page: number;
  per_page: number;
}

enum Tags {
  WARNING = 1,
  SUCCESS = 2
}
const statusMap = new Map([
  [Tags.WARNING, <Tag color="warning">审核中</Tag>],
  [Tags.SUCCESS, <Tag color="success">审核通过</Tag>]
]);

const Article = () => {
  const { channelList } = useChannel();

  // 准备列数据
  const columns: ColumnsType<DataType> = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />;
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => statusMap.get(data)
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Space>
        );
      }
    }
  ];

  const [reqData, setReqData] = useState<ReqData>({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  });

  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    }

    getList();
  }, [reqData]);

  const onFinish = (formValue: any) => {
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD'),
      status: formValue.status
    });
  };
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: '文章列表' }]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}> 草稿 </Radio>
              <Radio value={1}> 审核通过 </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" defaultValue="推荐" style={{ width: 120 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  );
};

export default Article;
