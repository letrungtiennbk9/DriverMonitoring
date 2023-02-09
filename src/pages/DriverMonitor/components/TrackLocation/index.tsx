import { Steps, Popover } from 'antd';
import Title from 'antd/lib/typography/Title';

type Props = {

};

const { Step } = Steps;

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const TrackLocation = () => {
  return <div>
    <Title>fajwklfjaklsjflkajwlkmf</Title>
    <Steps current={1} progressDot={customDot}>
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
    </Steps>
  </div>;
};

export default TrackLocation;
