import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import './InfoPopover.scss';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

const InfoPopover: React.FC = () => {
  const settings = (
    <div className="info">
      <Title level={5}>Hotkeys:</Title>
      <Paragraph>
        <kbd>&larr;</kbd>
        <kbd>&uarr;</kbd>
        <kbd>&darr;</kbd>
        <kbd>&rarr;</kbd>
        {' '}
        - select square
      </Paragraph>
      <Paragraph>
        <kbd>Backspace</kbd>
        {' '}
        - clear selection
      </Paragraph>
      <Paragraph>
        <kbd>Enter</kbd>
        or
        <kbd>Space</kbd>
        {' '}
        - make your move
      </Paragraph>
      <Paragraph>
        <kbd>Del</kbd>
        or
        <kbd>N</kbd>
        {' '}
        - start a new game
      </Paragraph>
    </div>
  );
  return (
    <Popover
      content={settings}
      trigger="hover"
      placement="topLeft"
    >
      <InfoCircleOutlined className="btn-info" />
    </Popover>
  );
};

export default InfoPopover;
