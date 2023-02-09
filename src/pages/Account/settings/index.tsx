/* eslint-disable react/display-name */
import {
  AntDesignOutlined,
  NotificationOutlined,
  SecurityScanOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import {
  Avatar,
  Button,
  Card,
  Menu,
  message,
  Switch,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useIntl } from "umi";

const { Title } = Typography;

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (): React.ReactNode => {
  const intl = useIntl();

  const [key, setKey] = useState("1");

  const handleSelectKey = (values: { key: string } & any) => {
    setKey(values.key);
  };
  return (
    <PageContainer>
      <Card>
        <div className="flex flex-row flex-1">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            onSelect={handleSelectKey}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Basic Settings
            </Menu.Item>
            <Menu.Item key="2" icon={<SecurityScanOutlined />}>
              Security Settings
            </Menu.Item>
            <Menu.Item key="3" icon={<NotificationOutlined />}>
              Nofitication Settings
            </Menu.Item>
          </Menu>

          {key === "1" && (
            <div className="ml-5">
              <Title level={3}>Basic Settings</Title>

              <ProForm<{
                name: string;
                company: string;
              }>
                onFinish={async (values) => {
                  await waitTime(2000);
                  console.log(values);
                  message.success("提交成功");
                }}
                initialValues={{
                  name: "蚂蚁设计有限公司",
                  useMode: "chapter",
                }}
              >
                <div className="flex items-center mb-8">
                  <Avatar size={100} icon={<AntDesignOutlined />} />
                  <Upload className="ml-5">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>

                <ProForm.Group>
                  <ProFormText
                    width="md"
                    name="email"
                    label="Email"
                    tooltip="Input your email here"
                    placeholder="administrator@Drivertrust.com"
                  />
                  <ProFormText
                    width="md"
                    name="nickname"
                    label="Nickname"
                    placeholder="DriverTrust"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    name={["address"]}
                    width="md"
                    label="Address"
                    placeholder="Ho Chi Minh City"
                  />
                  <ProFormDatePicker
                    width="md"
                    name={["dob"]}
                    label="Date of Birth"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormSelect
                    width="xs"
                    options={[
                      {
                        value: "male",
                        label: "Male",
                      },
                      {
                        value: "female",
                        label: "Female",
                      },
                      {
                        value: "secret",
                        label: "Unknown",
                      },
                    ]}
                    name="gender"
                    label="Gender"
                  />
                </ProForm.Group>
                <ProFormSelect
                  width="md"
                  options={[
                    {
                      value: "vn",
                      label: "Viet Nam",
                    },
                    {
                      value: "us",
                      label: "United States",
                    },
                    {
                      value: "sing",
                      label: "Singapore",
                    },
                  ]}
                  name="country"
                  label="Country"
                />
              </ProForm>
            </div>
          )}

          {key === "3" && (
            <div className="flex-1 ml-5">
              <Title level={3}>Notification Settings</Title>
              <div className="flex flex-col flex-1 w-full">
                <div className="flex items-center py-3 border-b border-gray-200">
                  <div className="flex flex-col w-full">
                    <div className="font-semibold">Notification On Phone</div>
                    <div className="text-gray-500">
                      Current phone number : 0989348969
                    </div>
                  </div>
                  <div className="ml-auto">
                    {" "}
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-gray-200">
                  <div className="flex flex-col">
                    <div className="font-semibold">Notification On Email</div>
                    <div className="text-gray-500">
                      Current Email : DriverTrust@gmail.com
                    </div>
                  </div>
                  <div className="ml-auto">
                    {" "}
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === "2" && (
            <div className="flex-1 ml-5">
              <Title level={3}>Security Settings</Title>
              <div className="flex flex-col flex-1 w-full">
                <div className="flex items-center py-3 border-b border-gray-200">
                  <div className="flex flex-col w-full">
                    <div className="font-semibold">Account Password</div>
                    <div className="text-gray-500">
                      Current Password Strength: Strong
                    </div>
                  </div>
                  <div className="ml-auto">
                    {" "}
                    <Button type="link">Modify</Button>
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-gray-200">
                  <div className="flex flex-col">
                    <div className="font-semibold">Security Phone</div>
                    <div className="text-gray-500">
                      Bounded Phone : 0903920423
                    </div>
                  </div>
                  <div className="ml-auto">
                    {" "}
                    <Button type="link">Modify</Button>
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-gray-200">
                  <div className="flex flex-col">
                    <div className="font-semibold">
                      Two Factor Authentication
                    </div>
                    <div className="text-gray-500">Current Status : Active</div>
                  </div>
                  <div className="ml-auto">
                    {" "}
                    <Button type="link">Modify</Button>
                  </div>
                </div>
                <div className="flex items-center py-3">
                  <div className="flex flex-col">
                    <div className="font-semibold">Account Password</div>
                    <div className="text-gray-500">
                      Current Password Strength: Strong
                    </div>
                  </div>
                  <div className="ml-auto">
                    {" "}
                    <Button type="link">Modify</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};
