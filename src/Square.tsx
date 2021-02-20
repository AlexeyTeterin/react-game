import * as React from 'react';

interface IProps {
  value: 'X' | 'O' | null,
  onClick: () => void,
}

export default function Square(props: IProps) {
  // const [value, setValue] = React.useState(props.value);

  return (
    <button
      type="button"
      className="square amber lighten-4"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
