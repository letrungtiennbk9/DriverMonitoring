/* eslint-disable react/display-name */
import { getRoute } from "@/services/ant-design-pro/route";
import { getVehicles } from "@/services/ant-design-pro/vehicle";
import {
  AreaChartOutlined,
  BellOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HourglassOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MonitorOutlined,
  PhoneOutlined,
  StarOutlined,
  VideoCameraOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import ProForm, { ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  Button,
  Card,
  Col,
  Menu,
  Result,
  Row,
  Select,
  Statistic,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { FormattedMessage, useIntl, useModel } from "umi";
import MilestoneList from "./components/MilestoneList";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
const { Title } = Typography;
const relativeTime = require("dayjs/plugin/relativeTime");
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const loadVehicles = async (
  query: string,
  company: number | undefined,
  cb: (vhc: any[]) => void
) => {
  const vehicles = await getVehicles({ company, keyword: query });
  cb(vehicles.data);
};

const { Countdown } = Statistic;
const { Option } = Select;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const containerStyle = {
  width: "100%",
  height: "280px",
  borderRadius: "4px",
};

const center = { lat: 10.762913, lng: 106.6821717 };
dayjs.extend(relativeTime);
export default (props: any): React.ReactNode => {
  const intl = useIntl();
  const [route, setRoute] = useState<any>(null);
  const [key, setKey] = useState("1");
  const [collapsed, setCollapsed] = useState(true);
  const handleSelectKey = (values: { key: string } & any) => {
    setKey(values.key);
  };

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await getRoute({ id: props.match.params.id });
      data.theMilestones = [
        ...data.theMilestones.sort((a: number, b: number) => a - b),
      ];
      setRoute(data);
    })();
  }, [props.match.params.id]);

  const { initialState } = useModel("@@initialState");

  const { currentCompany }: any = initialState;
  const [vehicles, setVehicles] = useState([]);
  const options = vehicles.map((d: any) => (
    <Option key={d.id} value={d.id}>
      {d.id + " - " + d.name}
    </Option>
  ));
  const handleSearch = async (query: string) => {
    await loadVehicles(query, currentCompany, (vhcs: any) => {
      setVehicles(vhcs);
    });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCTGfs20rFzNH-ncSZJ852aIQujbcyuteU",
    libraries: ["places"],
    region: "US",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((mapp) => {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    // mapp.fitBounds(bounds);
    // setMap(mapp);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const monitor = useFullScreenHandle();

  return (
    <PageContainer>
      <Row className="mb-5" gutter={16}>
        <Col span={6}>
          <Card className="h-full suffix-block">
            <Statistic title="ID" value={route?.id} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="h-full">
            <Statistic
              title="Milestones"
              value={`${route?.theMilestones.length} (1200km)`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="h-full">
            <Statistic title="Vehicle" value={route?.vehicle} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="h-full">
            <Countdown
              title="Time to start"
              value={new Date(route?.theMilestones[0].startAt).getTime()}
              onFinish={() => {}}
            />
          </Card>
        </Col>
      </Row>
      <Card>
        <div className="flex flex-row flex-1 gap-4">
          <div className="flex flex-col">
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
            <Menu
              inlineCollapsed={collapsed}
              defaultSelectedKeys={["1"]}
              onSelect={handleSelectKey}
            >
              <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                Basic Informations
              </Menu.Item>
              <Menu.Item key="2" icon={<CheckOutlined />}>
                Milestones Management
              </Menu.Item>
              <Menu.Item key="3" icon={<MonitorOutlined />}>
                Monitoring
              </Menu.Item>
              <Menu.Item key="4" icon={<AreaChartOutlined />}>
                Analytics
              </Menu.Item>
            </Menu>
          </div>

          {key === "1" && (
            <div className="ml-5">
              <Title level={3}>Basic Information</Title>
              <div className="mb-5 text-xs text-gray-700">
                Last modified : {dayjs(route?.updatedA).format()}
              </div>

              {route && (
                <ProForm<{
                  name: string;
                  company: string;
                }>
                  onFinish={async (values: any) => {}}
                  initialValues={{
                    useMode: "chapter",
                    ...route,
                  }}
                  submitter={{
                    searchConfig: {
                      submitText: "Update",
                      resetText: "Reset",
                    },
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      width="md"
                      name="name"
                      label="Name"
                      tooltip="Route name"
                      placeholder="eg.. HCM to HN"
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.vehicle.licenseplate.required"
                              defaultMessage="Required"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormText
                      width="md"
                      name="company"
                      initialValue={currentCompany}
                      hidden
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormText
                      name="description"
                      width="md"
                      label="Description"
                      placeholder="Description"
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.vehicle.licenseplate.required"
                              defaultMessage="Required"
                            />
                          ),
                        },
                      ]}
                    />
                    {/* <ProFormDateTimeRangePicker
                  width="md"
                  name="time"
                  label="Time Scheduled"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.vehicle.licenseplate.required"
                          defaultMessage="Required"
                        />
                      ),
                    },
                  ]}
                /> */}
                  </ProForm.Group>
                  <ProForm.Group>
                    {/* <ProForm.Item
                      className="w-full"
                      name="vehicle"
                      label="Vehicle Select"
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.vehicle.licenseplate.required"
                              defaultMessage="Required"
                            />
                          ),
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        className="min-w-full w-96"
                        placeholder="Vehicle name"
                        dropdownMatchSelectWidth
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearch}
                        notFoundContent={null}
                      >
                        {options}
                      </Select>
                    </ProForm.Item> */}

                    {/* <ProForm.Item
                    className="w-72"
                    label="Select Drivers"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.vehicle.licenseplate.required"
                            defaultMessage="Required"
                          />
                        ),
                      },
                    ]}
                  ></ProForm.Item> */}
                  </ProForm.Group>
                  <ProFormTextArea
                    width="lg"
                    name="note"
                    label="Note"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.vehicle.licenseplate.required"
                            defaultMessage="Required"
                          />
                        ),
                      },
                    ]}
                  />
                </ProForm>
              )}
            </div>
          )}

          {key === "3" && (
            <div className="flex-1 ml-5">
              <FullScreen
                className={`bg-white ${monitor.active ? "p-4" : ""}`}
                handle={monitor}
              >
                <div className="flex items-center justify-between">
                  <Title level={3}>Monitoring</Title>
                  <div className="flex flex-row">
                    <button className="h-8 px-5 text-pink-700 bg-pink-200 rounded-md ring-0 ring-pink-500">
                      <PhoneOutlined />
                    </button>

                    <button
                      onClick={monitor.active ? monitor.exit : monitor.enter}
                      className="h-8 px-5 ml-3 text-gray-700 bg-gray-200 rounded-md ring-0 ring-gray-500"
                    >
                      {!monitor.active ? (
                        <FullscreenOutlined />
                      ) : (
                        <FullscreenExitOutlined />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-1 w-full mt-8">
                  {/* <Result title="This route has not start yet." /> */}

                  <Row gutter={12}>
                    <Col className="overflow-hidden rounded-md" span={12}>
                      <ReactPlayer
                        width="100%"
                        height="280px"
                        style={{ borderRadius: 10 }}
                        url="https://www.youtube.com/watch?v=5qap5aO4i9A"
                        playing
                      />
                    </Col>

                    <Col span={12}>
                      {isLoaded && (
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={10}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                        >
                          {/* Child components, such as markers, info windows, etc. */}
                          <></>
                        </GoogleMap>
                      )}
                    </Col>
                  </Row>

                  <div className="flex justify-between gap-3 mt-8">
                    <div className="flex-1 p-4 border border-gray-200 rounded-md">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-900">
                          <StarOutlined className="mr-1" />
                          Kho Hang 1
                        </span>
                        <span className="mt-1 text-xs text-gray-800">
                          <EnvironmentOutlined className="mr-1" />
                          227 Duong Nguyen Van Cu, Phuong 3, Quan 5, Tp Ho Chi
                          Minh
                        </span>
                        <span className="mt-1 text-xs text-gray-700">
                          <BellOutlined className="mr-1" />
                          Start time :{" "}
                          <span className="font-medium text-gray-900">
                            {dayjs(Date.now()).format("LLL")}
                          </span>{" "}
                        </span>
                        <span className="mt-1 text-xs text-gray-700">
                          <BellOutlined className="mr-1" />
                          Arrived time :{" "}
                          <span className="font-medium text-gray-900">
                            {dayjs(Date.now()).format("LLL")}
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center px-5">
                      <img
                        className="h-auto w-28"
                        src="/run.gif"
                        alt="running"
                      />
                      <div
                        className="w-full text-xs bg-gray-200"
                        style={{ height: 1 }}
                      ></div>

                      <span className="text-xs text-gray-800">
                        Distance: 120km
                      </span>
                      <span className="text-xs text-gray-800">
                        Speed: <span className="text-green-800">40km/h</span>
                      </span>
                    </div>
                    <div className="flex-1 p-4 border border-gray-200 rounded-md">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-900">
                          <StarOutlined className="mr-1" />
                          Kho Hang 2
                        </span>
                        <span className="mt-1 text-xs text-gray-800">
                          <EnvironmentOutlined className="mr-1" />
                          227 Duong Nguyen Van Cu, Phuong 3, Quan 5, Tp Ho Chi
                          Minh
                        </span>
                        <span className="mt-1 text-xs text-gray-700">
                          <BellOutlined className="mr-1" />
                          Start time :{" "}
                          <span className="font-medium text-gray-900">
                            {dayjs(Date.now()).format("LLL")}
                          </span>{" "}
                        </span>
                        <span className="mt-1 text-xs text-gray-700">
                          <BellOutlined className="mr-1" />
                          Estimate Arrived time :{" "}
                          <span className="font-medium text-gray-900">
                            {dayjs(Date.now()).format("LLL")}
                          </span>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FullScreen>
            </div>
          )}

          {key === "2" && (
            <div className="flex-1 ml-5">
              <Title level={3}>Milestones</Title>
              <div className="flex flex-col flex-1 w-full">
                <MilestoneList milestones={route?.theMilestones || []} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};
