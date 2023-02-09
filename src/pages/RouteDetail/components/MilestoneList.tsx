/* eslint-disable react/display-name */

import { Button, Tag, Space, Avatar, Popover, Divider } from "antd";
import ProList from "@ant-design/pro-list";
import { memo, ReactText, useMemo, useState } from "react";
import {
  BellOutlined,
  ClockCircleFilled,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Progress } from "@ant-design/charts";
import dayjs from "dayjs";
const localizedFormat = require("dayjs/plugin/localizedFormat");
const defaultAvatar =
  "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg";
dayjs.extend(localizedFormat);
function MilestoneList({ milestones }) {
  const dataSource = useMemo(() => {
    return milestones;
  }, [milestones]);

  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>(
    []
  );
  return (
    <ProList<any>
      toolBarRender={() => {
        return [
          <Button key="add" type="primary">
            New
          </Button>,
        ];
      }}
      onRow={(record: any) => {
        return {
          onMouseEnter: () => {
            console.log(record);
          },
          onClick: () => {
            console.log(record);
          },
        };
      }}
      rowKey="name"
      headerTitle="Milestone List"
      tooltip="List all of milestones belong to a route"
      dataSource={dataSource}
      showActions="hover"
      //   expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
      showExtra="hover"
      metas={{
        title: {
          render: (dom, entity, index) => (
            <>
              <Tag color="blue">#{index + 1}</Tag>
              <span className="font-medium text-md">
                {entity.name || "Kho Hang #1"}
              </span>
            </>
          ),
        },
        avatar: {
          render: (dom, entity) => (
            <>
              <Popover
                content={
                  <div className="flex flex-col">
                    <span>
                      Name : {entity.theDriver.name || entity.theDriver.email}
                    </span>
                    <span>
                      Phone number : {entity.theDriver.phone || "113"}
                    </span>
                  </div>
                }
                title="Driver information"
              >
                <Avatar
                  size="large"
                  src={entity.theDriver.avatar || defaultAvatar}
                />
              </Popover>
            </>
          ),
        },
        description: {
          render: (dom, entity) => (
            <>
              <div className="flex flex-col">
                <span className="text-xs text-gray-800">
                  <EnvironmentOutlined className="mr-1" />
                  {entity.address ||
                    "227 Duong Nguyen Van Cu, Phuong 3, Quan 5, Tp Ho Chi Minh"}
                </span>
                <span className="mt-1 text-xs text-gray-700">
                  <BellOutlined className="mr-1" />
                  Start time :{" "}
                  <span className="font-medium text-gray-900">
                    {dayjs(entity.startAt).format("LLL")}
                  </span>{" "}
                  - End time :{" "}
                  <span className="font-medium text-gray-900">
                    {dayjs(entity.endAt).format("LLL")}
                  </span>{" "}
                </span>
                <span className="mt-1 text-xs text-gray-700">
                  <EditOutlined className="mr-1" />
                  Last modified :{" "}
                  <span className="font-semibold text-gray-600">
                    {dayjs(entity.updatedAt).format("LLL")}
                  </span>
                </span>
              </div>
            </>
          ),
        },

        subTitle: {
          render: (dom, entity) => {
            console.log(entity);
            return (
              <Space size={0}>
                <Tag color="blue">Pickup</Tag>
                <Tag color="#5BD8A6">Recharge</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row) => [
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="link"
            >
              View on Gmaps
            </a>,
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="warning"
            >
              Edit
            </a>,
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="view"
            >
              Delete
            </a>,
          ],
        },
      }}
    />
  );
}

export default memo(MilestoneList);
