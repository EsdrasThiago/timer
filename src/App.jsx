const MOB = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/054a91f2-3cd8-45d1-89f2-dd4828550aeb/dfkz7pd-573172f7-c5b7-4d98-ae71-57a8ea7295e0.png/v1/fit/w_300,h_765,strp/mob_render_by_aeiouact4_dfkz7pd-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY1IiwicGF0aCI6IlwvZlwvMDU0YTkxZjItM2NkOC00NWQxLTg5ZjItZGQ0ODI4NTUwYWViXC9kZmt6N3BkLTU3MzE3MmY3LWM1YjctNGQ5OC1hZTcxLTU3YThlYTcyOTVlMC5wbmciLCJ3aWR0aCI6Ijw9NjkyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.mKtcCuP1uLkxXOsKG6O3ggHldqUHvOHnBQgcR5hU18Y'
import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'


function App() {

  const [totalSeconds, setTotalSeconds] = useState(10 * 60);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [play, setPlay] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [selected, setSelected] = useState(false);
  const [image, setImage] = useState(MOB);
  const [change, setChange] = useState(false);
  const [write, setWrite] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ONE_SECOND = 1000;

  const setMinutes = (event) => {
    const minutesInput = event.target.value
    setInputMinutes(minutesInput);
  }

  const sendMinutes = () => {
    const numberMinutes = Number(inputMinutes)
    const minutesInteger = Number.isInteger(numberMinutes);
    const minutesValidator = numberMinutes > 0 && numberMinutes < 61
    if (!minutesInteger) {
      setSelected(false);
      return setErrorMessage('Insira um numero inteiro');
    };
    if (!numberMinutes) {
      setSelected(false);
      return setErrorMessage('Insira um valor');
    }
    if (!minutesValidator) {
      setSelected(false);
      return setErrorMessage('Insira um valor de 1 a 60');
    }
    console.log(minutesInteger);
    setStopped(false);
    setSelected(true);
    setErrorMessage('');
    setTotalSeconds(numberMinutes * 60);
  }

  const imageChangerButton = () => {
    setChange(!change)
  }

  const imageChangerInput = ({ target }) => {
    setImage(target.value)
  }

  const playButton = () => {
    setStopped(false);
    setPlay(true);
  }

  const pauseButton = () => {
    setPlay(false);
  }

  const stopButton = () => {
    setPlay(false);
    setStopped(true);
    setSelected(false);
    setTotalSeconds(10 * 60);
  }

  const tenMinutes = () => {
    setStopped(false);
    setSelected(true);
    setTotalSeconds(10 * 60);
  }

  const sevenMinutes = () => {
    setStopped(false);
    setSelected(true);
    setTotalSeconds(7 * 60);
  }

  const fiveMinutes = () => {
    setStopped(false);
    setSelected(true);
    setTotalSeconds(5 * 60);
  }

  useEffect(() => {
    if (play) {
      if (totalSeconds === 0) {
        setSelected(false)
        setStopped(true)
        setPlay(false)
        return
      };
      setTimeout(() => {
        setTotalSeconds(totalSeconds - 1)
      }, ONE_SECOND)
    }
  }, [totalSeconds, play])

  useEffect(() => {
    if (image.length < 5) setImage(MOB);
  }, [image])

  return (
    <div className="App">
      {stopped ? <title>10:00</title> 
      : <title>{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</title>}
      {stopped ? <span className="display">10:00</span>
        : <div className="display">
          <span>{minutes.toString().padStart(2, "0")}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
      }
      {!play &&
        <div className='minutes'>
          <h1>Escolha quanto tempo deseja</h1>
          {write
            ? <div>
              <button type='button' onClick={() => setWrite(!write)}>Selecionar</button>
              <input type="number" onChange={setMinutes} value={inputMinutes} className="input" />
              <button type='button' onClick={sendMinutes}>Enviar Valor</button>
            </div>
            : <div>
              <button type='button' onClick={() => setWrite(!write)}>Escrever</button>
              <button type='button' onClick={tenMinutes}>10 Minutos</button>
              <button type='button' onClick={sevenMinutes}>7 Minutos</button>
              <button type='button' onClick={fiveMinutes}>5 Minutos</button>
            </div>
          }
        </div>
      }
      {errorMessage && <p>{errorMessage}</p>}
      <div className='buttons'>
        {!play
          ? (
            selected &&
            <button
              type='button'
              className="playButton"
              value="play"
              onClick={playButton}
            >
              Play
            </button>)
          : (
            <button
              type='button'
              className="pauseButton"
              value="pause"
              onClick={pauseButton}
            >
              Pause
            </button>
          )}
        {play &&
          <button
            type='button'
            className="stopButton"
            onClick={stopButton}
          >
            Stop
          </button>
        }
      </div>
      <img className="imagem" src={image} alt='timer image' />
      {!change
        ? <button type='button' onClick={imageChangerButton}>Mude a imagem</button>
        : <button type='button' onClick={imageChangerButton}>Voltar</button>
      }
      {change &&
        <input placeholder='Insira o link da imagem' className="input" onChange={imageChangerInput} />
      }
    </div>
  )
}

export default App
