import DemoLine from '@/components/Charts/Line';
import LiquidChart from '@/components/Charts/Liquid';
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Row className="mb-5" gutter={16}>
        <Col span={18}>
          <Card className="h-full suffix-block">
            <Statistic
              title="Total Driver Instances"
              value={123}

              prefix={<UserOutlined />}
              suffix={<div className="w-full h-auto mt-4"><DemoLine /></div>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Row gutter={[16, 16]} className="flex flex-col w-full h-full" >
            <Col span={24} className="flex-1">
              <Card className="h-full suffix-block">
                <Statistic
                  title="CPU Percents"
                  value={64}
                  suffix={<div className="block w-full h-full"><LiquidChart percent={0.14} /></div>}
                />
              </Card>
            </Col>
            <Col span={24} className="flex-1">
              <Card className="h-full suffix-block">
                <Statistic
                  title="Memory Percents"
                  value={75}

                />
                <LiquidChart percent={0.25} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: '更快更强的重型组件，已经发布。',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="高级表格" />{' '}
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
          </a>
        </Typography.Text>

        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          <FormattedMessage id="pages.welcome.advancedLayout" defaultMessage="高级布局" />{' '}
          <a
            href="https://procomponents.ant.design/components/layout"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
          </a>
        </Typography.Text>

      </Card>
    </PageContainer>
  );
};
