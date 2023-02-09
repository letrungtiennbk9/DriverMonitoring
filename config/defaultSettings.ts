import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  collapsedButtonRender: boolean;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#3e79f7',
  layout: 'side',
  headerHeight: 50,
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  collapsedButtonRender: false,
  colorWeak: false,
  title: 'DriverTrust',
  pwa: true,
  logo: '/logo.png',
  iconfontUrl: '',
};

export default Settings;
