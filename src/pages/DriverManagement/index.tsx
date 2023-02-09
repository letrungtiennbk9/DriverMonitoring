/* eslint-disable react/display-name */
/* eslint-disable require-await */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-duplicate-imports */
import DebounceSelect from "@/components/DebounceSelect";
import { addDriver, clients } from "@/services/ant-design-pro/client";
import { getCompanies } from "@/services/ant-design-pro/company";
import { removeRule, updateRule } from "@/services/ant-design-pro/rule";
import {InboxOutlined, PlusOutlined, DownOutlined, EllipsisOutlined, MoreOutlined } from "@ant-design/icons";
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions";
import ProDescriptions from "@ant-design/pro-descriptions";
import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {Button, Drawer, Input, message, Tag, notification, Space, Menu, Dropdown } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Modal from "antd/lib/modal/Modal";
import Dragger from "antd/lib/upload/Dragger";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { FormattedMessage, useIntl, useModel } from "umi";
import type { FormValueType } from "./components/UpdateForm";
import UpdateForm from "./components/UpdateForm";
import _ from 'lodash'
import flvjs from 'flv.js'
import {getStreamingLink, removeStreamingLink} from "@/services/ant-design-pro/user";

const { KLTN_WEBSOCKET_URL } = process.env;

async function fetchUserList(username: string): Promise<any[]> {
  console.log("fetching user", username);

  return getCompanies({ current: 1, pageSize: 100, keyword: "" }).then((body) =>
    body.data.map((company: { name: string; id: number }) => ({
      label: `${company.name}`,
      value: company.id,
    }))
  );
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (value: { email: string; company: number }) => {
  const hide = message.loading("processing.request");
  try {
    await addDriver(value);
    hide();
    message.success("request.success");
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading("正在配置");
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success("配置成功");
    return true;
  } catch (error) {
    hide();
    message.error("配置失败请重试！");
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ClientItem[]) => {
  const hide = message.loading("正在删除");
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success("删除成功，即将刷新");
    return true;
  } catch (error) {
    hide();
    message.error("删除失败，请重试");
    return false;
  }
};

const openNotification = (state) => {
  const key = `open${Date.now()}`;
  const btn = (
    <>
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Go to cabin...
      </Button>

      {/* <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Go to route...
    </Button>

      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Go to milestone...
    </Button> */}
    </>
  );

  notification.open({
    message: "Driver is absent",
    description:
      // `Driver ${state.driver.id - state.driver.name} is absent on route ${state.route.id} - ${state.route.name}`,
      `Driver ${state.driverId} - ${state.driverName} is absent on route ${state.routeId} - ${state.routeName}`,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    // btn,
    key,
  });
};

const processDriverState = (state) => {
  console.log(state);
  openNotification(state);
};

const socket = io(String(KLTN_WEBSOCKET_URL));

let flvPlayer = null

const DriverManagement: React.FC = () => {
  useEffect(() => {
    socket.on("driver-state-came", processDriverState);
  }, []);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
    false
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [contextMenuOpenedItem, setContextMenuOpenedItem] = useState<any>(null)

  const [streamingLink, setStreamingLink] = useState<any>(null)  

  const [showStreamModal, setShowStreamModal] = useState(false)

  const videoRef = useRef<any>(null)

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ClientItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ClientItem[]>([]);
  const [companyValue, setCompanyValue] = React.useState([]);

  const {
    initialState: { currentCompany },
  }: any = useModel("@@initialState");

  const intl = useIntl();

  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }, [currentCompany]);

  useEffect(() => {
    if (showStreamModal) {
      if (contextMenuOpenedItem) {
        getStreamingLink(contextMenuOpenedItem.id, new Date('2021-06-17T06:45:00Z'))
          .then(link => {
            setStreamingLink(link)
          })
      }
    } else {
      if (contextMenuOpenedItem) {
        removeStreamingLink(contextMenuOpenedItem.id, new Date('2021-06-17T06:45:00Z'))
          .then(() => setStreamingLink(null))
      }
    }
  }, [showStreamModal])

  useEffect(() => {
    if (streamingLink && videoRef) {      
      if (flvjs.isSupported()) {
        flvPlayer = flvjs.createPlayer({
          type: 'flv',
          // url: streamingLink
          url: 'http://localhost:3336/driver-monitoring/1.flv'
        });
        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  }, [streamingLink])

  useEffect(() => {
    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
      }
    }
  }, [])

  const getDrivers = useCallback(
    async (params) => {
      return clients({ roles: "driver", company: currentCompany, ...params });
    },
    [currentCompany]
  );

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={(e) => {
          e.preventDefault()
          setShowStreamModal(true)
        }}>
          Open cabin
      </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          Show location
      </a>
      </Menu.Item>
    </Menu>
  );

  const columns: ProColumns<API.ClientItem>[] = [
    {
      title: (
        <FormattedMessage id="pages.searchTable.id" defaultMessage="Keyword" />
      ),
      dataIndex: "keyword",
      valueType: "text",
      hideInTable: true,
    },

    {
      title: <FormattedMessage id="pages.searchTable.id" defaultMessage="ID" />,
      dataIndex: "id",
      valueType: "digit",

      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.email" defaultMessage="Email" />
      ),
      dataIndex: "email",
      valueType: "text",
      hideInSearch: true,
      render: (_dom, entity) => {
        const avatar = entity?.avatar?.length > 0 ? entity?.avatar[0] : "";

        return (
          <>
            <Avatar src={`http://localhost:3333/${avatar}`}></Avatar>
            <span className="ml-2">{entity.email}</span>
          </>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.company"
          defaultMessage="规则名称"
        />
      ),
      hideInSearch: true,
      dataIndex: "company",
      valueType: "text",
      tip: "pages.searchTable.updateForm.ruleName.companyHint",
      render: (_dom, entity) => {
        const { companies } = entity;
        return companies.map((company) => (
          <Tag key={company.name} color="magenta">
            {company.name}
          </Tag>
        ));
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleDesc"
          defaultMessage="描述"
        />
      ),
      dataIndex: "roles",
      valueType: "select",
      hideInSearch: true,
      renderFormItem: (item, { defaultRender }) => {
        return defaultRender(item);
      },
      valueEnum: {
        "": {
          text: <span>All</span>,
          status: "All",
        },
        admin: {
          text: <span>Admin</span>,
          status: "Admin",
        },

        client: {
          text: <span>Client</span>,
          status: "Client",
        },

        driver: {
          text: <span>Driver</span>,
          status: "Driver",
        },
      },
    },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.face"
          defaultMessage="isVerified"
        />
      ),
      dataIndex: "faces",
      valueType: "select",
      hideInSearch: true,
      renderFormItem: (item, { defaultRender }) => {
        console.log({ item });
        return item ? <span>Verified</span> : <span>Unverified</span>;
      },
      valueEnum: {
        "": {
          text: <span>All</span>,
          status: "All",
        },
        unverified: {
          text: <span>Unverified</span>,
          status: "Admin",
        },

        verified: {
          text: <span>Verified</span>,
          status: "Client",
        },
      },
    },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleStatus"
          defaultMessage="状态"
        />
      ),
      dataIndex: "status",
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="关闭"
            />
          ),
          status: "Default",
        },
        1: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.running"
              defaultMessage="运行中"
            />
          ),
          status: "Processing",
        },
        2: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.online"
              defaultMessage="已上线"
            />
          ),
          status: "Success",
        },
        3: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.abnormal"
              defaultMessage="异常"
            />
          ),
          status: "Error",
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.createdAt"
          defaultMessage="Created At"
        />
      ),
      sorter: true,
      dataIndex: "createdAt",
      valueType: "dateTime",
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue("status");
        if (`${status}` === "0") {
          return false;
        }
        if (`${status}` === "3") {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: "pages.searchTable.exception",
                defaultMessage: "请输入异常原因！",
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },

    {
      title: 'Action',
      key: 'action',
      sorter: true,
      align: 'center',
      render: (_, record) => (
        <Dropdown overlay={menu} trigger={['click']}>
          <a href='' className="ant-dropdown-link" onClick={async e => {
            e.preventDefault()
            setContextMenuOpenedItem(record)
          }}>
            <MoreOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];
  
  return (
    <PageContainer>
      <ProTable<API.ClientItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: "pages.searchTable.title",
          defaultMessage: "查询表格",
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />{" "}
            <FormattedMessage
              id="pages.searchTable.new"
              defaultMessage="新建"
            />
          </Button>,
        ]}
        request={getDrivers}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage
                id="pages.searchTable.chosen"
                defaultMessage="已选择"
              />{" "}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{" "}
              <FormattedMessage
                id="pages.searchTable.item"
                defaultMessage="项"
              />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{" "}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{" "}
                <FormattedMessage
                  id="pages.searchTable.tenThousand"
                  defaultMessage="万"
                />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="批量删除"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="批量审批"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: "pages.searchTable.createForm.newRule",
          defaultMessage: "新建规则",
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (val: any) => {
          const res = await handleAdd({ ...val, company: currentCompany });
          if (actionRef.current && res) {
            actionRef.current.reload();
          }
          return res;
        }}
      >
        <ProFormText
          name="email"
          rules={[{ required: true, type: "email" }]}
          label="Email"
          tooltip="Enter email address of user"
          placeholder="example@drivertrust.com"
        />

        <ProForm.Item
          name="companies"
          hidden
          label="Company"
          initialValue={[currentCompany]}
          valuePropName="checked"
        >
          <DebounceSelect
            id="companies"
            mode="multiple"
            value={[currentCompany]}
            name="companies"
            placeholder="Select Companies"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setCompanyValue(newValue);
            }}
            className="mb-6"
            style={{ width: "100%" }}
          />
        </ProForm.Item>
        {/* <ProForm.Item name="avatar" label="Avatar" valuePropName="checked">
          <Dragger
            {...{
              id: "avatar",
              name: "avatar",
              multiple: false,
              maxCount: 1,
              listType: "picture",
              beforeUpload: () => {
                return false;
              },
              action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
              onChange(info) {
                const { status } = info.file;
                if (status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully.`
                  );
                } else if (status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              },
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload avatar.
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other band files
            </p>
          </Dragger>
        </ProForm.Item> */}
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.email && (
          <ProDescriptions<API.ClientItem>
            column={2}
            title={currentRow?.email}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.email,
            }}
            columns={columns as ProDescriptionsItemProps<API.ClientItem>[]}
          />
        )}
      </Drawer>
      <Modal
        visible={showStreamModal}
        title={`${_.get(contextMenuOpenedItem, 'id')} - ${_.get(contextMenuOpenedItem, 'name')}`}
        onCancel={() => setShowStreamModal(false)}
        onOk={() => setShowStreamModal(false)}
      >
        <video ref={videoRef} />
      </Modal>
    </PageContainer>
  );
};

export default DriverManagement;
