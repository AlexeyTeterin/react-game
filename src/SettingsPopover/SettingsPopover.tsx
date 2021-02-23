/* eslint-disable no-unused-vars */
import {
  CloseOutlined, SettingOutlined, SoundOutlined,
} from '@ant-design/icons';
import {
  Popover, Radio, RadioChangeEvent, Slider, Switch,
} from 'antd';
import { FaMoon, FaSun } from 'react-icons/fa';
import Title from 'antd/lib/typography/Title';
import * as React from 'react';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import { themes } from '../Game';
import './SettingsPopover.scss';
import EMOJI, { setOfEmoji } from '../emoji';

interface IProps {
  themeSelect: themes;
  onThemeChange: (e: RadioChangeEvent) => void;
  isDark: boolean;
  onDarkModeChange: SwitchChangeEventHandler;
  isSound: boolean;
  soundVolume: number;
  onSoundToggle: SwitchChangeEventHandler;
  onSoundSliderChange: (value: number) => void;
  symbols: setOfEmoji;
  onSymbolsChange: (e: RadioChangeEvent) => void;
}

export default function SettingsPopover(props: IProps) {
  const settings = (
    <div className="settings">
      <Title level={5}>Theme: </Title>
      <Radio.Group
        buttonStyle="solid"
        value={props.themeSelect}
        onChange={props.onThemeChange}
      >
        <Radio.Button className="Autumn" value="Autumn">Autumn</Radio.Button>
        <Radio.Button className="Winter" value="Winter">Winter</Radio.Button>
        <Radio.Button className="Spring" value="Spring">Spring</Radio.Button>
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
      <div className="settings__sound">
        <Switch
          checkedChildren={<SoundOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={props.isSound}
          onChange={props.onSoundToggle}
        />
        <Slider
          disabled={!props.isSound}
          value={props.soundVolume * 100}
          onChange={props.onSoundSliderChange}
        />
      </div>
      <p />
      <Title level={5}>Symbols: </Title>
      <Radio.Group
        buttonStyle="outline"
        value={props.symbols}
        onChange={props.onSymbolsChange}
      >
        <Radio.Button className="symbols" value={EMOJI.simple}>❌ ⭕</Radio.Button>
        <Radio.Button className="symbols" value={EMOJI.nature}>❄️ 🌸</Radio.Button>
        <Radio.Button className="symbols" value={EMOJI.danger}>☠️ ☢️</Radio.Button>
      </Radio.Group>
    </div>
  );
  return (
    <Popover content={settings} trigger="click" placement="topRight">
      <SettingOutlined className="settingsBtn" />
    </Popover>
  );
}
