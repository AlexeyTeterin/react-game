import * as React from 'react';
import './MovesDropdown.css';
import { Dropdown, Menu, Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

interface IProps {
  history: { squares: any[]; }[];
  onItemClick: Function;
}

export default function MovesDropdown(props: IProps) {
  const movesMenu = () => {
    const moves = props.history.map((step, move: number) => {
      const desc = move
        ? `Go to move # ${move}`
        : 'Go to game start';
      return (
        <Menu.Item onClick={() => props.onItemClick(move)}>
          {desc}
        </Menu.Item>
      );
    });
    return (<Menu>{moves}</Menu>);
  };

  return (
    <Dropdown
      overlay={movesMenu}
      trigger={['click']}
      placement="bottomCenter"
      className="MovesDropdown"
    >
      <Button type="dashed" ghost icon={<UndoOutlined />}>
        Moves history
      </Button>

    </Dropdown>
  );
}
