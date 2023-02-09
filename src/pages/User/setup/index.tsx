import Footer from "@/components/Footer";
import { updatePassword } from "@/services/ant-design-pro/user";
import { LockOutlined } from "@ant-design/icons";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedMessage, history, Link, SelectLang, useIntl } from "umi";
import styles from "./index.less";

const SetupAccount: React.FC = ({ location }: any) => {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<string>("account");

  const intl = useIntl();

  useEffect(() => {
    if (!location?.query?.verifyToken) {
      setType("invalid");
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>

      <div className="container max-w-6xl">
        <div className="flex justify-around mt-10">
          <div className="p-8 mb-4 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col">
              <Link to="/">
                <div className="flex">
                  <img alt="logo" className={styles.logo} src="/logo.png" />
                  <span className={styles.title}>DriverTrust</span>
                </div>
              </Link>
              <div className="flex flex-col mt-5">
                <span className="text-xl font-bold text-gray-700">
                  Setup your password
                </span>
              </div>

              <div className="mt-10">
                <div className={styles.main}>
                  <ProForm
                    initialValues={{
                      autoLogin: true,
                    }}
                    submitter={{
                      searchConfig: {
                        submitText: intl.formatMessage({
                          id: "pages.setup.submit",
                          defaultMessage: "登录",
                        }),
                      },
                      render:
                        type === "invalid" ? false : (_, dom) => dom.pop(),
                      submitButtonProps: {
                        loading: submitting,
                        size: "large",
                        style: {
                          width: "100%",
                        },
                      },
                    }}
                    onFinish={async (values) => {
                      try {
                        await updatePassword({
                          verificationToken: location.query.verifyToken,
                          password: values.password,
                        });
                        message.success("Successfully update the password.");
                        history.replace("/");
                      } catch (err) {
                        message.error(err.data.message);
                      }
                    }}
                  >
                    {type === "invalid" && (
                      <FormattedMessage
                        id="pages.login.setup.required"
                        defaultMessage="Forbidden Access!"
                      />
                    )}

                    {type === "account" && (
                      <>
                        <ProFormText.Password
                          name="password"
                          fieldProps={{
                            size: "large",
                            prefix: (
                              <LockOutlined className={styles.prefixIcon} />
                            ),
                          }}
                          placeholder={intl.formatMessage({
                            id: "pages.login.password.placeholder",
                            defaultMessage: "Enter your password.",
                          })}
                          rules={[
                            {
                              required: true,
                              message: (
                                <FormattedMessage
                                  id="pages.login.password.required"
                                  defaultMessage="请输入用户名!"
                                />
                              ),
                            },
                          ]}
                        />
                        <ProFormText.Password
                          name="confirmPassword"
                          fieldProps={{
                            size: "large",
                            prefix: (
                              <LockOutlined className={styles.prefixIcon} />
                            ),
                          }}
                          placeholder={intl.formatMessage({
                            id: "pages.login.password.placeholder",
                            defaultMessage: "密码: ant.design",
                          })}
                          rules={[
                            {
                              required: true,
                              message: (
                                <FormattedMessage
                                  id="pages.login.password.required"
                                  defaultMessage="请输入密码！"
                                />
                              ),
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    "The two passwords that you entered do not match!"
                                  )
                                );
                              },
                            }),
                          ]}
                        />
                      </>
                    )}

                    <div
                      style={{
                        marginBottom: 24,
                      }}
                    ></div>
                  </ProForm>
                  <Space className={styles.other}></Space>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SetupAccount;
function getFakeCaptcha(arg0: { phone: string }) {
  return true;
}
