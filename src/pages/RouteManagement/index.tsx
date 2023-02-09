/* eslint-disable react/display-name */
/* eslint-disable no-duplicate-imports */
/* eslint-disable valid-jsdoc */
import { deleteRoute, getRoutes } from "@/services/ant-design-pro/route";
import { removeRule, updateRule } from "@/services/ant-design-pro/rule";
import { addVehicle } from "@/services/ant-design-pro/vehicle";
import { PlusOutlined } from "@ant-design/icons";
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions";
import ProDescriptions from "@ant-design/pro-descriptions";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Drawer, Input, message, Popconfirm } from "antd";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { FormattedMessage, useHistory, useIntl, useModel } from "umi";
import CreateForm from "./components/CreateForm";
import type { FormValueType } from "./components/UpdateForm";
import UpdateForm from "./components/UpdateForm";
import { Link } from "umi";
const handleAdd = async (value: {
  name: string;
  images: { fileList: File[] };
  companyId: number;
}) => {
  const formData = new FormData();
  formData.append("name", value.name);
  console.log(value);
  formData.append("company", value.companyId);
  // eslint-disable-next-line no-restricted-syntax
  for (const file of value.images.fileList) {
    formData.append("images", file.originFileObj);
  }

  const hide = message.loading("processing.request");
  try {
    await addVehicle(formData);
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
 * @return undefinded
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

const RouteManagement: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
    false
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ClientItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ClientItem[]>([]);
  const [vehicleImages, setVehicleImages] = React.useState({ fileList: [] });
  const { initialState } = useModel("@@initialState");

  const { currentCompany }: any = initialState;
  const history = useHistory();
  const intl = useIntl();

  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }, [currentCompany]);

  const columns: ProColumns<API.ClientItem>[] = useMemo(
    () => [
      {
        title: (
          <FormattedMessage
            id="pages.searchTable.id"
            defaultMessage="Keyword"
          />
        ),
        dataIndex: "keyword",
        valueType: "text",
        hideInTable: true,
      },

      {
        title: (
          <FormattedMessage id="pages.searchTable.id" defaultMessage="ID" />
        ),
        dataIndex: "id",
        valueType: "digit",
        hideInSearch: true,
        render: (dom, item: any) => {
          return [
            <Link key={item.id} to={`/company/routes/${item.id}`}>
              <span>{item.id}</span>
            </Link>,
          ];
        },
      },

      {
        title: (
          <FormattedMessage
            id="pages.searchTable.route.name"
            defaultMessage="Name"
          />
        ),
        dataIndex: "name",
        valueType: "text",
      },

      {
        title: (
          <FormattedMessage
            id="pages.searchTable.route.description"
            defaultMessage="Description"
          />
        ),
        dataIndex: "description",
        valueType: "text",
      },

      {
        title: (
          <FormattedMessage
            id="pages.searchTable.route.vehicle"
            defaultMessage="Vehicle"
          />
        ),
        dataIndex: "vehicle",
        valueType: "text",
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
          <Popconfirm
            key="delete"
            placement="topRight"
            title="Are you sure to delete this route?"
            onConfirm={async () => {
              try {
                await deleteRoute({ id: (record as any).id });
                message.success("Delete route success");
                // eslint-disable-next-line no-unused-expressions
                actionRef.current && actionRef.current.reload();
              } catch (err) {
                message.error("Delete route error");
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <a key="delete">
              <FormattedMessage
                id="pages.searchTable.delete"
                defaultMessage="Delete"
              />
            </a>
          </Popconfirm>,
        ],
      },
    ],
    [intl]
  );

  const handleChangeImages = useCallback(
    ({ fileList }: any) => setVehicleImages({ fileList }),
    []
  );

  const loadRoutes = useCallback(() => {
    return getRoutes({ company: currentCompany });
  }, [currentCompany]);
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
              history.push("/company/routes/create");
            }}
          >
            <PlusOutlined />{" "}
            <FormattedMessage
              id="pages.searchTable.new"
              defaultMessage="新建"
            />
          </Button>,
        ]}
        request={loadRoutes}
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

      <CreateForm
        onSubmit={async (values: any) => {
          // eslint-disable-next-line no-param-reassign
          values.companyId = currentCompany;
          const success = await handleAdd(values);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        modalVisible={createModalVisible}
        images={vehicleImages}
        companyId={currentCompany}
        handleChangeImages={handleChangeImages}
      />

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

export default RouteManagement;
