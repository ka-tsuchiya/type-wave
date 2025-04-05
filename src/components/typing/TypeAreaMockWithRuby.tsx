import React, { useCallback } from 'react';
import { isFinish } from '../../core/TypingCore';
import TypeAreaWithRuby from './TypeAreaWithRuby';
import CountDownTimer from './CountDownTimer';
import Timer from './Timer';
import { SelectTypeLength, SelectBaseSpeed } from './SelectComponents';
import { useTypingLogic } from '../../hooks/useTypingLogic';

function TypeAreaMockWithRuby() {
  const {
    typingState,
    resultText,
    newWord,
    sortWord,
    handleKeyPress,
    handleKeyDown,
    escape,
    start,
    countDown,
    selectLength,
    selectBaseKPM
  } = useTypingLogic();

  const click = useCallback(() => {
    newWord();
    countDown(3);
  }, [newWord, countDown]);

  const sortedClick = useCallback(() => {
    sortWord();
    countDown(3);
  }, [sortWord, countDown]);

  if(typingState.isTyping) {
    return (
      <div>
        <button
          onClick={() => window.open(`http://twitter.com/share?url=tk2-256-37539.vs.sakura.ne.jp/type/index.html&text=${resultText}&hashtags=TypeWave`, '_blank')}
        >
          Twitterで共有する
        </button>
        <SelectBaseSpeed
          onSelect={selectBaseKPM}
          disabled={true} 
        />
        <SelectTypeLength
          onSelect={selectLength}
          disabled={true}
        />
        <div className="Container">
          <button onClick={click} id="startButton" disabled={true}>
            スタート
          </button>
          <button disabled={true}>
            ソートしてやり直し
          </button>
          <div>
            {isFinish(typingState.state) ? (
              <div>
                {typingState.state.index + "打 / " + (typingState.finishTime / 1000).toFixed(3) + "秒 = " + (typingState.state.index / typingState.finishTime * 60000).toFixed(2) + "kpm"}
              </div>
            ) : (
              <Timer
                startTime={typingState.startTime}
                digit={1}
              />
            )}
          </div>
          <div onKeyPress={handleKeyPress} onKeyDown={handleKeyDown} tabIndex={0} className="TypeArea">
            <TypeAreaWithRuby
              words={typingState.words}
              state={typingState.state}
              baseKPM={typingState.baseKPM}
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => window.open(`http://twitter.com/share?url=tk2-256-37539.vs.sakura.ne.jp/type/index.html&text=${resultText}&hashtags=TypeWave`, '_blank')}
        >
          Twitterで共有する
        </button>
        <SelectBaseSpeed
          onSelect={selectBaseKPM}
          disabled={false}
        />
        <SelectTypeLength
          onSelect={selectLength}
          disabled={false}
        />
        <div className="Container">
          <button onClick={click} id="startButton" disabled={!typingState.buttonEnabled}>
            スタート
          </button>
          <button onClick={sortedClick} disabled={!typingState.buttonEnabled || (typingState.finishTime == 0)}>
            ソートしてやり直し
          </button>
          <div>
            <CountDownTimer
              count={typingState.count}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TypeAreaMockWithRuby