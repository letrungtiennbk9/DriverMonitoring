import ProForm, { ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card } from "antd";
import { FormattedMessage, useIntl } from "umi";

function CompanyInformation() {
  const intl = useIntl();
  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: "pages.client.information",
        defaultMessage: "Manage your company information.",
      })}
    >
      <Card>
        <ProForm<{
          name: string;
          company: string;
        }>
          onFinish={async (values: any) => {}}
          initialValues={{
            useMode: "chapter",
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="Name"
              tooltip="Company Name"
              placeholder="eg.. Cong ty Co Phan Tiki"
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
              width="lg"
              name="company"
              label="Transaction Name"
              tooltip="Transaction Name"
              placeholder="eg... Tiki Joint Stock Company."
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
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="address"
              width="xl"
              label="Address"
              placeholder="eg.. Ho Chi Minh City"
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
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="taxcode"
              width="sm"
              label="Tax Code"
              placeholder="eg.. 1217671923"
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
              name="phone"
              width="sm"
              label="Phone"
              placeholder="eg.. 0972748373"
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
          </ProForm.Group>
          <ProFormTextArea
            width="lg"
            name="id"
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
      </Card>
    </PageHeaderWrapper>
  );
}

export default CompanyInformation;
