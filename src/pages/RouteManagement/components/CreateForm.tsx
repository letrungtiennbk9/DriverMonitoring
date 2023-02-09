import PicturesWall from '@/components/PicturesWall';
import { getVehicles } from '@/services/ant-design-pro/vehicle';
import ProForm, {
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm
} from '@ant-design/pro-form';
import { Button, Modal, Select } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<any>;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  modalVisible: boolean;
  images: { fileList: any[] };
  companyId: number | undefined;
  handleChangeImages: ({ fileList }: any) => void
};

const { Option } = Select;


const loadVehicles = async (query: string, company: number | undefined, cb: (vhc: any[]) => void) => {
  const vehicles = await getVehicles({ company });
  cb(vehicles.data);
};


const CreateForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const [vehicles, setVehicles] = React.useState<any>([]);
  const options = vehicles.map((d: any) => <Option key={d.id} value={d.id}>{d.id + " - " + d.name}</Option>);
  const company = props.companyId;

  const handleSearch = async (query: string) => {
    await loadVehicles(query, company, (vhcs) => {
      setVehicles(vhcs);
    });
  };

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={600}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: '规则配置',
            })}
            visible={props.modalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm

        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <div className="w-auto">
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.licenseplate',
              defaultMessage: 'Route Name',
            })}
            width="md"
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

          <ProFormTextArea
            name="desc"
            width="md"
            label={intl.formatMessage({
              id: 'pages.vehicle.desc',
              defaultMessage: 'Description',
            })}
            placeholder={intl.formatMessage({
              id: 'pages.vehicle.desc.placeholder',
              defaultMessage: 'For long trip.',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.vehicle.desc.placeholder"
                    defaultMessage="Please enter the description of vehicle."
                  />
                ),
                min: 5,
              },
            ]}
          />
          <ProForm.Item className="w-full" name="vehicle" label="Vehicle Select">
            <Select
              showSearch
              className="w-full min-w-full"
              placeholder="Please select vehicle."
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
        </div>

      </StepsForm.StepForm>


      <StepsForm.StepForm
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.startEndConfig',
          defaultMessage: 'Start - End Location',
        })}
      >
        <ProFormGroup title="Start Point">

          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.name',
              defaultMessage: 'Name of location',
            })}
            width="md"
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
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.address',
              defaultMessage: 'Address',
            })}
            width="md"
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

          <Button type="primary">Pick by Maps</Button>
          <ProFormText
            name="startlat"
            label={intl.formatMessage({
              id: 'pages.vehicle.licenseplate',
              defaultMessage: 'Latitute',
            })}

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
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.licenseplate',
              defaultMessage: 'Longitude',
            })}

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
        </ProFormGroup>
        <ProFormGroup title="End Point">

          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.name',
              defaultMessage: 'Name of location',
            })}
            width="md"
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
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.address',
              defaultMessage: 'Address',
            })}
            width="md"
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

          <Button type="primary">Pick by Maps</Button>

          <ProFormText
            name="startlat"
            label={intl.formatMessage({
              id: 'pages.vehicle.licenseplate',
              defaultMessage: 'Latitute',
            })}

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
            name="name"
            label={intl.formatMessage({
              id: 'pages.vehicle.licenseplate',
              defaultMessage: 'Longitude',
            })}

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
        </ProFormGroup>


      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title={intl.formatMessage({
          id: 'pages.route.milestone',
          defaultMessage: 'Stop Points',
        })}
      >

        <PicturesWall name="images" images={props.images} handleChange={props.handleChangeImages} />

      </StepsForm.StepForm>

    </StepsForm>
  );
};

export default CreateForm;
