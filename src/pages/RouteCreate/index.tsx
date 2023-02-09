/* eslint-disable no-nested-ternary */
/* eslint-disable require-await */
/* eslint-disable valid-jsdoc */
import { clients } from "@/services/ant-design-pro/client";
import { addMileStone } from "@/services/ant-design-pro/milestone";
import { addRoute, deleteRoute } from "@/services/ant-design-pro/route";
import { getVehicles } from "@/services/ant-design-pro/vehicle";
import {
  ArrowLeftOutlined,
  ClearOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import ProForm, {
  ModalForm,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  Button,
  Card,
  Empty,
  FormInstance,
  message,
  Select,
  Tabs,
  Tag,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage, useHistory, useIntl, useModel } from "umi";
import { getGeocode } from "use-places-autocomplete";
import SearchMap from "./components/Search";
const { TabPane } = Tabs;
const { Option } = Select;
type Point = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};
const loadVehicles = async (
  query: string,
  company: number | undefined,
  cb: (vhc: any[]) => void
) => {
  const vehicles = await getVehicles({ company, keyword: query });
  cb(vehicles.data);
};

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "4px",
};

const center = {
  lat: "10.762913",
  lng: "106.6821717",
};

const libraries: any = ["places"];

const RouteCreate: React.FC = () => {
  const { initialState } = useModel("@@initialState");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCTGfs20rFzNH-ncSZJ852aIQujbcyuteU",
    libraries,
    region: "US",
  });
  const { currentCompany }: any = initialState;
  const intl = useIntl();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState("1");
  const [vehicles, setVehicles] = useState([]);
  const handleSearch = async (query: string) => {
    await loadVehicles(query, currentCompany, (vhcs: any) => {
      setVehicles(vhcs);
    });
  };

  const [driversResult, setDriversResult] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const handleSearchDriver = async (query: string) => {
    const { data } = await clients({
      pageSize: 100,
      current: 1,
      keyword: query,
      sortType: "ASC",
      sortBy: "id",
      roles: "driver",
    });

    setDriversResult(data);
  };
  const [formData, setFormData] = useState(null);
  const options = vehicles.map((d: any) => (
    <Option key={d.id} value={d.id}>
      {d.id + " - " + d.name}
    </Option>
  ));
  const driverOptions = driversResult.map((d: any) => (
    <Option key={d.id} value={JSON.stringify(d)}>
      {d.id + " - " + d.email}
    </Option>
  ));
  const handleBackToList = useCallback(() => {
    history.push("/company/routes");
  }, [history]);
  const [centerP, setCenterP] = useState({ lat: 10.762913, lng: 106.6821717 });
  const [markers, setMarkers] = useState<Point | any>([]);

  const [modalPointVisible, setModalPointVisible] = useState(false);
  const formRef = useRef<FormInstance>();
  const [mapState, setMapState] = React.useState<GoogleMap>();
  const [isFormValid, setFormValid] = useState(false);
  const [defaultPointValue, setDefaultPointValue] = useState<
    Partial<Point> | undefined
  >(undefined);
  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMapState(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMapState(undefined);
  }, []);
  const handleChangeTab = (tabKey: string) => setCurrentTab(tabKey);

  const onVisibleChange = useCallback((e: any) => {
    console.log("called");
    setModalPointVisible((prev) => !prev);
  }, []);

  const handleAddNewPoint = useCallback((point: Point) => {
    console.log(point);

    setMarkers((prev: any) => [...prev, point]);
    formRef?.current?.resetFields();
    setModalPointVisible(false);
    return true;
  }, []);

  const onMarkerDelete = useCallback((name: string) => {
    setMarkers((prev: Point[]) => prev.filter((m: Point) => m.name !== name));
  }, []);

  const handleAddNewRoute = async () => {
    if (markers.length < 2) {
      message.error("Not enough points for a route.");
      return false;
    }
    const values = formData as any;
    // values!.startTime = new Date(values!.time[0]).getTime() / 1000;
    // values!.endTime = new Date(values!.time[1]).getTime() / 1000;

    const mappedMarkers = markers.map((marker: any, index: number) => ({
      ...marker,
      driver: Number(marker.driver),
      startAt: marker.time[0],
      endAt: marker.time[1],
    }));
    let data = null;
    try {
      data = await addRoute(values);
      for (const marker of mappedMarkers) {
        const milestone = await addMileStone({
          ...marker,
          startAt: marker.time[0],
          endAt: marker.time[1],
          route: data.id,
        });
        console.log(milestone);
      }
      message.success("Add route success");
      handleBackToList();
    } catch (err) {
      console.log(err);
      if (data) await deleteRoute({ id: data.id });
      message.error("Add route error");
    }
    return true;
  };

  const handleDriverListChange = useCallback((values) => {
    console.log(values);
    setDriverList(values.map((v: string) => JSON.parse(v)));
  }, []);

  const getDriverOptions = (): any => {
    const dOps = {};
    driverList.forEach((driver: any) => {
      dOps[driver.id] = driver.email;
    });

    return dOps;
  };

  return (
    <PageContainer>
      <Card>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              className="text-xs text-gray-600 cursor-pointer"
              onClick={handleBackToList}
              tabIndex={-1}
            >
              <ArrowLeftOutlined /> Back to list
            </span>
            <span className="mt-1 text-lg font-semibold text-gray-900">
              {" "}
              Create New Route
            </span>
          </div>
          <div>
            <Button
              onClick={() => {
                history.replace("/company/routes");
              }}
              icon={<ClearOutlined />}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleAddNewRoute}
              className="ml-2"
              disabled={!formData || markers.length < 2}
            >
              Save
            </Button>
          </div>
        </div>

        <Tabs
          defaultActiveKey={currentTab}
          activeKey={currentTab}
          onChange={handleChangeTab}
        >
          <TabPane tab={<span>Basic Information</span>} key="1">
            <ProForm<{
              name: string;
              company: string;
            }>
              onFinish={async (values: any) => {
                setFormData(values);
                setCurrentTab("2");
              }}
              initialValues={{
                name: "DriverMonitoring Basic Route",
                description: "Route description",
                note: "Notes for this route",
                useMode: "chapter",
              }}
              submitter={{
                searchConfig: {
                  submitText: "Next Step",
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
                <ProForm.Item
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
                    className="w-full min-w-full"
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
                </ProForm.Item>

                <ProForm.Item
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
                >
                  <Select
                    showSearch
                    mode="multiple"
                    className="w-full"
                    placeholder="Driver name/email"
                    dropdownMatchSelectWidth
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={handleDriverListChange}
                    onSearch={handleSearchDriver}
                    notFoundContent={null}
                  >
                    {driverOptions}
                  </Select>
                </ProForm.Item>
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
          </TabPane>
          <TabPane tab={<span>Stop Points</span>} key="2">
            <div className="flex flex-1">
              <div className="flex flex-col items-center max-h-full mr-3 overflow-y-auto w-60">
                {markers.length === 0 && <Empty className="my-3" />}
                {markers.map((marker: any, index: number) => {
                  const tag =
                    index === 0
                      ? "START"
                      : index === markers.length - 1
                      ? "END"
                      : `#${index}`;
                  return (
                    <div
                      onClick={() =>
                        mapState!.panTo({ lat: marker.lat, lng: marker.lng })
                      }
                      key={marker.name}
                      className="relative flex flex-col justify-between w-full h-16 p-2 mb-3 border border-gray-200 rounded-md cursor-pointer bg-gray-50 group"
                    >
                      <div>
                        <Tag color="green">{tag}</Tag>
                        <span>{marker.name}</span>
                      </div>

                      <div className="text-xs truncate overflow-ellipsis">
                        <EnvironmentOutlined /> {marker.address}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkerDelete(marker.name);
                        }}
                        className="absolute hidden px-3 py-2 -translate-y-1/2 bg-white rounded-md shadow-sm right-3 top-3 group-hover:block"
                      >
                        <DeleteOutlined />{" "}
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={onVisibleChange}
                  className="w-full p-2 text-xs font-semibold text-gray-900 border border-gray-900 border-dashed rounded-md"
                >
                  Add Manually
                </button>
              </div>

              {isLoaded && (
                <div className="relative flex-1" style={{ height: 400 }}>
                  <SearchMap
                    onSelect={(value: Partial<Point>) => {
                      mapState!.panTo({
                        lat: value!.lat || 0,
                        lng: value!.lng || 0,
                      });
                      (mapState as GoogleMap & { setZoom: any })!.setZoom(21);
                      setDefaultPointValue(value);
                      setModalPointVisible(true);
                    }}
                  />
                  <div className="absolute z-0" style={containerStyle}>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={centerP}
                      zoom={16}
                      onLoad={onLoad}
                      onClick={async (event) => {
                        const address = {
                          lat: event.latLng.lat(),
                          lng: event.latLng.lng(),
                        };
                        const resp = await getGeocode({ location: address });
                        setDefaultPointValue({
                          ...address,
                          address: resp[1].formatted_address,
                        });
                        setModalPointVisible(true);
                      }}
                      onUnmount={onUnmount}
                    >
                      {/* Child components, such as markers, info windows, etc. */}
                      <>
                        {markers.map((marker: any) => (
                          <Marker
                            key={marker.time}
                            position={{ lat: marker.lat, lng: marker.lng }}
                          />
                        ))}
                      </>
                    </GoogleMap>
                  </div>
                </div>
              )}
            </div>
          </TabPane>
        </Tabs>
      </Card>
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({
          id: "pages.route.create.modalcreate",
          defaultMessage: "Create New Point",
        })}
        onVisibleChange={() => formRef.current?.resetFields()}
        modalProps={{
          onCancel: () => setModalPointVisible(false),
        }}
        width="400px"
        visible={modalPointVisible}
        onFinish={handleAddNewPoint as any}
        initialValues={{
          name: `Milstone name - ${Date.now()}`,
        }}
        submitter={{
          searchConfig: {
            submitText: "Add",
            resetText: "Cancel",
          },
        }}
      >
        <ProFormText
          name="name"
          rules={[{ required: true, type: "string" }]}
          label="Name"
          tooltip="Enter name of location"
          placeholder="Base"
        />

        <ProFormText
          name="address"
          rules={[{ required: true, type: "string" }]}
          label="Address"
          tooltip="Enter addr of location"
          placeholder="227 Nguyen Van Cu"
          initialValue={defaultPointValue?.address}
        />

        <ProFormDateTimeRangePicker
          width="md"
          name="time"
          label="Estimated time"
          placeholder={["Start at", "End at"]}
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

        <div className="flex justify-between">
          <div className="mr-3">
            <ProFormDigit
              name="lat"
              rules={[{ required: true, type: "number" }]}
              label="Latitude"
              tooltip="Enter latitude of location"
              placeholder="10.3523"
              initialValue={defaultPointValue?.lat}
            />
          </div>

          <ProFormDigit
            name="lng"
            rules={[{ required: true, type: "number" }]}
            label="Longitude"
            tooltip="Enter longitude of location"
            placeholder="24.2312"
            initialValue={defaultPointValue?.lng}
          />
        </div>

        <ProFormSelect
          name="driver"
          label="Main Driver"
          placeholder="Driver name"
          valueEnum={getDriverOptions()}
        ></ProFormSelect>
      </ModalForm>
    </PageContainer>
  );
};

export default RouteCreate;
