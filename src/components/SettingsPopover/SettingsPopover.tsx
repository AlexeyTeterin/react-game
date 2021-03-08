/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  CloseOutlined, SettingOutlined, SoundOutlined,
} from '@ant-design/icons';
import {
  Popover, Radio, RadioChangeEvent, Slider, Switch,
} from 'antd';
import { FaMoon, FaSun } from 'react-icons/fa';
import Title from 'antd/lib/typography/Title';
import './SettingsPopover.scss';
import rootConnector, { GameProps } from '../../model/rootConnector';
import { handleNewGameClick } from '../../controller/handlers';

const SettingsPopover: React.FC<GameProps> = (props: GameProps) => {
  const handleBoardSizeChange = (e: RadioChangeEvent) => {
    const boardSize = e.target.value;
    props.setBoardSize(boardSize);
    props.setHistory([{ squares: Array(boardSize ** 2).fill(null) }]);
    props.setCurrentBoard();
  };

  const settings = (
    <div className="settings">
      <Title level={5}>Theme: </Title>
      <Radio.Group
        buttonStyle="solid"
        value={props.theme}
        onChange={props.setTheme}
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
        defaultChecked={props.darkMode}
        onChange={props.toggleDarkMode}
      />
      <p />
      <Title level={5}>Sound:</Title>
      <div className="settings__sound">
        <Switch
          checkedChildren={<SoundOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={props.isSound}
          onChange={props.toggleSound}
        />
        <Slider
          disabled={!props.isSound}
          value={props.soundVolume * 100}
          onChange={props.setSoundVolume}
        />
      </div>
      <p />
      <Title level={5}>Music:</Title>
      <div className="settings__sound">
        <Switch
          checkedChildren={<SoundOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={props.isMusic}
          onChange={props.toggleMusic}
        />
        <Slider
          disabled={!props.isMusic}
          value={props.musicVolume * 100}
          onChange={props.setMusicVolume}
        />
      </div>
      <p />
      <Title level={5}>Symbols: </Title>
      <Radio.Group
        buttonStyle="outline"
        value={props.emojis}
        onChange={props.setEmojis}
      >
        <Radio.Button className="emojis" value="simple">❌ ⭕</Radio.Button>
        <Radio.Button className="emojis" value="nature">❄️ 🌸</Radio.Button>
        <Radio.Button className="emojis" value="danger">☠️ ☢️</Radio.Button>
      </Radio.Group>
      <p />
      <Title level={5}>Board size: </Title>
      <Radio.Group onChange={handleBoardSizeChange} value={props.boardSize}>
        <Radio value={3} onClick={() => handleNewGameClick(props)}>3</Radio>
        <Radio value={4} onClick={() => handleNewGameClick(props)}>4</Radio>
        <Radio value={5} onClick={() => handleNewGameClick(props)}>5</Radio>
      </Radio.Group>
      <p />
      <Title level={5}>Square size: </Title>
      <Radio.Group onChange={props.setSquareSize} value={props.squareSize}>
        <Radio value="extraSmall">XS</Radio>
        <Radio value="small">S</Radio>
        <Radio value="medium">M</Radio>
        <Radio value="large">L</Radio>
      </Radio.Group>
    </div>
  );
  return (
    <Popover
      content={settings}
      trigger="click"
      placement="topRight"
    >
      <SettingOutlined className="btn-settings" />
    </Popover>
  );
};

export default rootConnector(SettingsPopover);
