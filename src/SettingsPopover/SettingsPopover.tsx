import {
  CloseOutlined, SettingOutlined, SoundOutlined,
} from '@ant-design/icons';
import { Popover, Switch } from 'antd';
import * as React from 'react';

export default function SettingsPopover() {
  const isSound = () => true;

  const settings = (
    <div>
      <p>Color scheme</p>
      <p>
        Sound:
        {' '}
        <Switch
          checkedChildren={<SoundOutlined />}
          unCheckedChildren={<CloseOutlined />}
          // defaultChecked
          defaultChecked={isSound()}
        />
      </p>
    </div>
  );
  return (
    <Popover content={settings} title="Settings" trigger="click" placement="topRight">
      <SettingOutlined className="settingsBtn" />
    </Popover>
  );
}
