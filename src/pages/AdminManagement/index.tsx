import { PageContainer } from '@ant-design/pro-layout';
import { message } from 'antd';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { addAdmin } from '@/services/ant-design-pro/admin'
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
function AdminManagement() {
  return (
    <PageContainer>
      <ProForm<API.CreateAdminField>
        onFinish={async (values) => {

          await waitTime(2000);
          console.log(values);
          try {
            await addAdmin(values)
            message.success('Create success');
          }
          catch (err) {
            message.error(err.data.message);
          }


        }}

      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="email"
            rules={[{ required: true, type: "email" }]}
            label="Email"
            tooltip="Enter email address of user"
            placeholder="example@drivertrust.com"
          />
          {/* <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" /> */}
        </ProForm.Group>
        {/* <ProForm.Group>
                    <ProFormText
                        name={['contract', 'name']}
                        width="md"
                        label="合同名称"
                        placeholder="请输入名称"
                    />
                    <ProFormDateRangePicker width="md" name={['contract', 'createTime']} label="合同生效时间" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSelect
                        options={[
                            {
                                value: 'chapter',
                                label: '盖章后生效',
                            },
                        ]}
                        readonly
                        width="xs"
                        name="useMode"
                        label="合同约定生效方式"
                    />
                    <ProFormSelect
                        width="xs"
                        options={[
                            {
                                value: 'time',
                                label: '履行完终止',
                            },
                        ]}
                        name="unusedMode"
                        label="合同约定失效效方式"
                    />
                </ProForm.Group>
                <ProFormText width="sm" name="id" label="主合同编号" />
                <ProFormText name="project" width="md" disabled label="项目名称" initialValue="xxxx项目" />
                <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" /> */}
      </ProForm>
    </PageContainer>
  )
}

export default AdminManagement
