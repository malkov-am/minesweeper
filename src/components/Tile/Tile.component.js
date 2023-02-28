import clsx from 'clsx';
import React from 'react';
import './Tile.styles.scss';

const Tile = ({ tile, tileState, onOpenTile }) => {
  return (
    <>
      <button
        className={clsx(
          'field__tile',
          tile === -1 && 'field__tile-mine',
          tile === 0 && 'field__tile-empty',
          tile === 1 && 'field__tile-one',
          tile === 2 && 'field__tile-two',
          tile === 3 && 'field__tile-three',
          tile === 4 && 'field__tile-four',
          tile === 5 && 'field__tile-five',
          tile === 6 && 'field__tile-six',
          tile === 7 && 'field__tile-seven',
          tile === 8 && 'field__tile-eight',
          tileState === 'hidden' && 'field__tile-hidden',
        )}
        onClick={onOpenTile}
      ></button>
    </>
  );
};

export default Tile;
