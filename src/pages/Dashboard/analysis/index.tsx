/* eslint-disable react/display-name */
import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Card, Alert, Typography, Button, Col, Row, Statistic } from "antd";
import { useIntl, FormattedMessage } from "umi";
import { DollarOutlined } from "@ant-design/icons";
import "./style.less";
import ColumnChart from "./components/charts/Column";
export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Row className="mb-5" gutter={16}>
        <Col span={6}>
          <Card className="h-full suffix-block">
            <Statistic
              title="Total Sales"
              value={236.52}
              precision={2}
              prefix={<DollarOutlined />}
              suffix={
                <div className="block w-full h-16 mt-4">
                  <ColumnChart />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="h-full">
            <Statistic title="Visit" value={2314} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="h-full">
            <Statistic title="Active Users" value={112893} loading />
          </Card>
        </Col>
      </Row>
      <Card className="h-full">
        <Alert
          message={intl.formatMessage({
            id: "pages.welcome.alertMessage",
            defaultMessage: "更快更强的重型组件，已经发布。",
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
          <FormattedMessage
            id="pages.welcome.advancedComponent"
            defaultMessage="高级表格"
          />{" "}
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage
              id="pages.welcome.link"
              defaultMessage="欢迎使用"
            />
          </a>
        </Typography.Text>

        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          <FormattedMessage
            id="pages.welcome.advancedLayout"
            defaultMessage="高级布局"
          />{" "}
          <a
            href="https://procomponents.ant.design/components/layout"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage
              id="pages.welcome.link"
              defaultMessage="欢迎使用"
            />
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
