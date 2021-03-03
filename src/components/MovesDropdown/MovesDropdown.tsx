import * as React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import './MovesDropdown.scss';

interface IProps {
  history: { squares: any[]; }[];
  onItemClick: Function;
}

export default function MovesDropdown(props: IProps) {
  const movesMenu = () => {
    const moves = props.history.map((step, move: number) => {
      const key = `move#${move}`;
      const desc = move
        ? `Go to move # ${move}`
        : 'Go to game start';
      return (
        <Menu.Item
          className="menu-li"
          key={key}
          onClick={() => props.onItemClick(move)}
        >
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
    >
      <Button type="dashed" ghost icon={<UndoOutlined />}>
        Moves history
      </Button>
    </Dropdown>
  );
}
