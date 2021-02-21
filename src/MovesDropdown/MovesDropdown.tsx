/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Menu } from '@material-ui/core';

interface IProps {
  moves: JSX.Element[];
}

export default function MovesDropdown(props: IProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMovesBtnClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMovesClose = () => { setAnchorEl(null); };

  return (
    <>
      <Button
        id="movesBtn"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMovesBtnClick}
      >
        Moves history
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMovesClose}
      >
        {props.moves}
      </Menu>
    </>
  );
}
