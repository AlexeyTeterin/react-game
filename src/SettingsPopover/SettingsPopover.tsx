/* eslint-disable no-unused-vars */
import {
  CloseOutlined, SettingOutlined, SoundOutlined,
} from '@ant-design/icons';
import {
  Popover, Radio, RadioChangeEvent, Switch,
} from 'antd';
import { FaMoon, FaSun } from 'react-icons/fa';
import Title from 'antd/lib/typography/Title';
import * as React from 'react';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import { themes } from '../App';

interface IProps {
  themeSelect: themes;
  onThemeChange: (e: RadioChangeEvent) => void;
  isDark: boolean;
  onDarkModeChange: SwitchChangeEventHandler;
}

export default function SettingsPopover(props: IProps) {
  const isSound = () => true;

  const settings = (
    <div>
      <Title level={5}>Theme: </Title>
      <Radio.Group value={props.themeSelect} onChange={props.onThemeChange}>
        <Radio.Button value="Autumn">Autumn</Radio.Button>
        <Radio.Button value="Winter">Winter</Radio.Button>
        <Radio.Button value="Spring">Spring</Radio.Button>
      </Radio.Group>
      <p />
      <Title level={5}>Dark mode:</Title>
      <Switch
        checkedChildren={<FaMoon />}
        unCheckedChildren={<FaSun />}
        defaultChecked={props.isDark}
        onChange={props.onDarkModeChange}
      />
      <p />
      <Title level={5}>Sound:</Title>
      <Switch
        checkedChildren={<SoundOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={isSound()}
      />
    </div>
  );
  return (
    <Popover content={settings} trigger="click" placement="topRight">
      <SettingOutlined className="settingsBtn" />
    </Popover>
  );
}
