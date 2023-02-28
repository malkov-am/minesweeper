import React, { useEffect, useState } from 'react';
import './GameField.styles.scss';
import { FIELD_HEIGHT, FIELD_WIDTH, MINES_QUANTITY, MINE } from '../../utils/constants';
import Tile from '../Tile/Tile.component';

const GameField = () => {
  const [tilesState, setTilesState] = useState(Array(FIELD_HEIGHT * FIELD_WIDTH).fill('hidden'));
  const [field, setField] = useState(setupField());
  useEffect(() => {
    console.log(tilesState);
  }, [tilesState]);
  // Функция получения индекса массива по игровым координатам
  function getArrayIndex(x, y) {
    return y * FIELD_WIDTH + x;
  }
  function setupField() {
    // Создадим массив плиток
    const field = Array(FIELD_HEIGHT * FIELD_WIDTH).fill(0);
    // При помощи цикла for расположим мины на поле в случайном порядке
    for (let i = 0; i <= MINES_QUANTITY; i++) {
      const randomTile = Math.floor(Math.random() * FIELD_HEIGHT * FIELD_WIDTH);
      if (field[randomTile] === MINE) continue;
      field[randomTile] = MINE;
    }
    // Рассчитаем колличество близлежащих мин
    for (let y = 0; y < FIELD_WIDTH; y++) {
      for (let x = 0; x < FIELD_HEIGHT; x++) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (field[getArrayIndex(x, y)] === MINE) continue;
            if (
              x + i >= 0 &&
              x + i < FIELD_WIDTH &&
              y + j >= 0 &&
              y + j < FIELD_HEIGHT &&
              field[getArrayIndex(x + i, y + j)] === MINE
            )
              field[getArrayIndex(x, y)] += 1;
          }
        }
      }
    }
    return field;
  }
  function openTile(tilePosition) {
    setTilesState(
      tilesState.map((state, i) => {
        if (i !== tilePosition) {
          return tilesState[i];
        } else {
          return 'open';
        }
      }),
    );
  }

  return (
    <div className="field">
      {field.map((tile, index) => {
        return (
          <Tile
            key={index}
            tile={tile}
            tileState={tilesState[index]}
            onOpenTile={() => openTile(index)}
          />
        );
      })}
    </div>
  );
};

export default GameField;
