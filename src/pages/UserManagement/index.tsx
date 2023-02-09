import DebounceSelect from "@/components/DebounceSelect";
import { addClient, clients } from "@/services/ant-design-pro/client";
import { getCompanies } from "@/services/ant-design-pro/company";
import { removeRule, updateRule } from "@/services/ant-design-pro/rule";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions";
import ProDescriptions from "@ant-design/pro-descriptions";
import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Drawer, Input, message, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Dragger from "antd/lib/upload/Dragger";
import React, { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "umi";
import type { FormValueType } from "./components/UpdateForm";
import UpdateForm from "./components/UpdateForm";

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
const handleAdd = async (value: {
  email: string;
  companies: any;
  avatar: any;
}) => {
  console.log(value);
  const formData = new FormData();
  formData.append("email", value.email);
  formData.append("companies", JSON.stringify(value.companies));
  formData.append("avatar", value.avatar.file);
  const hide = message.loading("processing.request");
  try {
    await addClient(formData);
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

const UserManagement: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
    false
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ClientItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ClientItem[]>([]);
  const [companyValue, setCompanyValue] = React.useState([]);

  const intl = useIntl();

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
      render: (dom, entity) => {
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
      dataIndex: "company",
      valueType: "text",
      tip: "pages.searchTable.updateForm.ruleName.companyHint",
      render: (dom, entity) => {
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
          status: "Admin",
        },

        driver: {
          text: <span>Driver</span>,
          status: "Admin",
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
      title: (
        <FormattedMessage
          id="pages.searchTable.titleOption"
          defaultMessage="操作"
        />
      ),
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage
            id="pages.searchTable.config"
            defaultMessage="配置"
          />
        </a>,
      ],
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
        request={clients}
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
          const res = await handleAdd(val);
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

        <ProForm.Item name="companies" label="Company" valuePropName="checked">
          <DebounceSelect
            id="companies"
            mode="multiple"
            value={companyValue}
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
        <ProForm.Item name="avatar" label="Avatar" valuePropName="checked">
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
        </ProForm.Item>
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
    </PageContainer>
  );
};

export default UserManagement;
