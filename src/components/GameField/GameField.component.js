import React, { useState } from 'react';
import './GameField.styles.scss';
import { FIELD_HEIGHT, FIELD_WIDTH, MINES_QUANTITY, MINE } from '../../utils/constants';
import clsx from 'clsx';

const GameField = () => {
  const [tilesState, setTilesState] = useState(Array(FIELD_HEIGHT * FIELD_WIDTH).fill('hidden'));
  // Функция получения индекса массива по игровым координатам
  function getArrayIndex(x, y) {
    return y * FIELD_WIDTH + x;
  }
  // Создадим массив плиток
  const field = Array(FIELD_HEIGHT * FIELD_WIDTH).fill(0);
  function setupField() {
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
  }
  setupField();
  function openTile(tilePosition) {}

  return (
    <div className="field">
      {field.map((tile, index) => {
        return (
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
              tilesState[index] === 'hidden' && 'field__tile-hidden',
            )}
            key={index}
            onClick={() => openTile(index)}
          ></button>
        );
      })}
    </div>
  );
};

export default GameField;
