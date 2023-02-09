import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import { Alert, Space, message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import ProForm, {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-form";
import {
  useIntl,
  Link,
  history,
  FormattedMessage,
  SelectLang,
  useModel,
} from "umi";
import Footer from "@/components/Footer";
import { login } from "@/services/ant-design-pro/login";
import { Carousel, Avatar } from "antd";

import styles from "./index.less";

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<any>({ status: "pending" });
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  
  const intl = useIntl();

  const goto = () => {
    if (!history) return;
    setTimeout(() => {
      const {query} = history.location;
      const {redirect} = query as {redirect: string};
      history.push(redirect || '/');
    }, 50);
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
        currentCompany:
          userInfo.companies.length > 0 ? userInfo.companies[0].id : null,
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.access_token) {        
        localStorage.setItem("access_token", msg.access_token);
        message.success("Login success!");
        await fetchUserInfo();
        goto();
        return;
      }
      setUserLoginState({ status: "error" });
    } catch (error) {
      setUserLoginState({ status: "error" });
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  useEffect(() => {
    window.localStorage.setItem('umi_locale', 'en-US')
  }, [])
  
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
                <span className="text-2xl font-bold text-gray-700">Welcome to DriverTrust</span>
                <span className="mt-2 text-sm font-semibold text-gray-600">Wanna monitor your drivers ? Login right now.</span>
              </div>

              <div className="mt-8">
                <div className={styles.main}>
                  <ProForm
                    initialValues={{
                      autoLogin: true,
                    }}
                    submitter={{
                      searchConfig: {
                        submitText: intl.formatMessage({
                          id: "pages.login.submit",
                          defaultMessage: "登录",
                        }),
                      },
                      render: (_, dom) => dom.pop(),
                      submitButtonProps: {
                        loading: submitting,
                        size: "large",
                        style: {
                          width: "100%",
                        },
                      },
                    }}
                    onFinish={async (values) => {
                      handleSubmit(values as API.LoginParams);
                    }}
                  >
                    <Tabs activeKey={type} onChange={setType}>
                      <Tabs.TabPane
                        key="account"
                        tab={intl.formatMessage({
                          id: "pages.login.accountLogin.tab",
                          defaultMessage: "账户密码登录",
                        })}
                      />
                      <Tabs.TabPane
                        key="mobile"
                        tab={intl.formatMessage({
                          id: "pages.login.phoneLogin.tab",
                          defaultMessage: "手机号登录",
                        })}
                      />
                    </Tabs>

                    {type === "account" && (
                      <>
                        <ProFormText
                          name="email"
                          fieldProps={{
                            size: "large",
                            prefix: (
                              <UserOutlined className={styles.prefixIcon} />
                            ),
                          }}
                          placeholder={intl.formatMessage({
                            id: "pages.login.username.placeholder",
                            defaultMessage: "Enter your email.",
                          })}
                          rules={[
                            {
                              required: true,
                              message: (
                                <FormattedMessage
                                  id="pages.login.username.required"
                                  defaultMessage="请输入用户名!"
                                />
                              ),
                            },
                          ]}
                        />
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
                          ]}
                        />
                      </>
                    )}

                    {status === "error" && loginType === "mobile" && (
                      <LoginMessage content="验证码错误" />
                    )}
                    {type === "mobile" && (
                      <>
                        <ProFormText
                          fieldProps={{
                            size: "large",
                            prefix: (
                              <MobileOutlined className={styles.prefixIcon} />
                            ),
                          }}
                          name="mobile"
                          placeholder={intl.formatMessage({
                            id: "pages.login.phoneNumber.placeholder",
                            defaultMessage: "手机号",
                          })}
                          rules={[
                            {
                              required: true,
                              message: (
                                <FormattedMessage
                                  id="pages.login.phoneNumber.required"
                                  defaultMessage="请输入手机号！"
                                />
                              ),
                            },
                            {
                              pattern: /^1\d{10}$/,
                              message: (
                                <FormattedMessage
                                  id="pages.login.phoneNumber.invalid"
                                  defaultMessage="手机号格式错误！"
                                />
                              ),
                            },
                          ]}
                        />
                        <ProFormCaptcha
                          fieldProps={{
                            size: "large",
                            prefix: (
                              <LockOutlined className={styles.prefixIcon} />
                            ),
                          }}
                          captchaProps={{
                            size: "large",
                          }}
                          placeholder={intl.formatMessage({
                            id: "pages.login.captcha.placeholder",
                            defaultMessage: "请输入验证码",
                          })}
                          captchaTextRender={(timing, count) => {
                            if (timing) {
                              return `${count} ${intl.formatMessage({
                                id: "pages.getCaptchaSecondText",
                                defaultMessage: "获取验证码",
                              })}`;
                            }
                            return intl.formatMessage({
                              id: "pages.login.phoneLogin.getVerificationCode",
                              defaultMessage: "获取验证码",
                            });
                          }}
                          name="captcha"
                          rules={[
                            {
                              required: true,
                              message: (
                                <FormattedMessage
                                  id="pages.login.captcha.required"
                                  defaultMessage="请输入验证码！"
                                />
                              ),
                            },
                          ]}
                          onGetCaptcha={async (phone) => {
                            const result = await getFakeCaptcha({
                              phone,
                            });
                            if (result === false) {
                              return;
                            }
                            message.success("获取验证码成功！验证码为：1234");
                          }}
                        />
                      </>
                    )}
                    <div
                      style={{
                        marginBottom: 24,
                      }}
                    >
                      <ProFormCheckbox noStyle name="autoLogin">
                        <FormattedMessage
                          id="pages.login.rememberMe"
                          defaultMessage="自动登录"
                        />
                      </ProFormCheckbox>
                      <a
                        style={{
                          float: "right",
                        }}
                      >
                        <FormattedMessage
                          id="pages.login.forgotPassword"
                          defaultMessage="忘记密码"
                        />
                      </a>
                    </div>
                  </ProForm>
                  <Space className={styles.other}>
                    <FormattedMessage
                      id="pages.login.loginWith"
                      defaultMessage="其他登录方式"
                    />
                    <AlipayCircleOutlined className={styles.icon} />
                    <TaobaoCircleOutlined className={styles.icon} />
                    <WeiboCircleOutlined className={styles.icon} />
                  </Space>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden mt-5 md:flex">
            <div className="h-full">
              <svg
                stroke="rgb(203, 213, 224)"
                fill="rgb(203, 213, 224)"
                strokeWidth="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="2.4rem"
                width="2.4rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.516 7c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5l-0.016-0.5c0-3.866 3.134-7 7-7v2c-1.336 0-2.591 0.52-3.536 1.464-0.182 0.182-0.348 0.375-0.497 0.578 0.179-0.028 0.362-0.043 0.548-0.043zM12.516 7c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5l-0.016-0.5c0-3.866 3.134-7 7-7v2c-1.336 0-2.591 0.52-3.536 1.464-0.182 0.182-0.348 0.375-0.497 0.578 0.179-0.028 0.362-0.043 0.549-0.043z"></path>
              </svg>
            </div>

            <div className="px-5 mt-5 w-testimonial ">
              <Carousel dots={false} autoplay>
                <blockquote >
                  <span className="text-2xl leading-8 text-gray-800">
                    Lorem dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>

                  <div className="flex w-full mt-5">
                    <Avatar size={48} src="/tam.jpg" />
                    <div className="flex flex-col ml-4">
                      <span className="text-lg font-semibold">Mtosity</span>
                      <span className="text-gray-800 text-md">
                        CEO at Mtosity Corp.
                      </span>
                    </div>
                  </div>
                </blockquote>
                <blockquote >
                  <span className="text-2xl leading-8 text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis numquam dolorum enim animi reprehenderit architecto? Laudantium, perspiciatis aut. Voluptatibus commodi porro libero iste expedita quos recusandae iusto nostrum eligendi unde.
                  </span>

                  <div className="flex w-full mt-5">
                    <Avatar size={48} src="/thai.jpg" />
                    <div className="flex flex-col ml-4">
                      <span className="text-lg font-semibold">Crepp</span>
                      <span className="text-gray-800 text-md">Tech lead at Crepp Inc.</span>
                    </div>
                  </div>
                </blockquote>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
