import PicturesWall from '@/components/PicturesWall';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm
} from '@ant-design/pro-form';
import { Modal } from 'antd';
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
  images: any[];
  handleChangeImages: ({ fileList }: any) => void
};

const CreateForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
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
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.vehicle.licenseplate',
            defaultMessage: 'License Plate',
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

        <ProFormSelect
          name="type"
          label={intl.formatMessage({
            id: 'pages.vehicle.type',
            defaultMessage: 'Type of vehicle',
          })}
          width="md"
          valueEnum={{
            full: 'Truck',
            pickup: 'Pickup truck',
          }}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title={intl.formatMessage({
          id: 'pages.vehicles.stepimage',
          defaultMessage: 'Image Upload',
        })}
      >

        <PicturesWall name="images" images={props.images} handleChange={props.handleChangeImages} />

      </StepsForm.StepForm>

    </StepsForm>
  );
};

export default CreateForm;
