import React, { useEffect, useRef, useState } from 'react'
import { theme1, theme2, theme3 } from '../../Theme'

export default function Calculator() {
  // FUNCTIONS
  function handleThemeToggle() {
    if (ThemeSelected == 1) {
      setThemeSelected(2)
      setThemeStyle(theme2)
    } else if (ThemeSelected == 2) {
      setThemeSelected(3)
      setThemeStyle(theme3)
    } else if (ThemeSelected == 3) {
      setThemeSelected(1)
      setThemeStyle(theme1)
    }
  }
  function KeyInputHandler(e) {
    if (validInputsArray.includes(e.key)) {
      Input.current.value = Input.current.value.concat(e.key)
    } else if (e.key == "Enter") {
      handleEqual()
    }
  }
  function Appender(number) {
    Input.current.value = Input.current.value.concat(number)
  }
  function handleReset() {
    Input.current.value = ''
  }
  function handleDel() {
    let str = Input.current.value
    str = str.slice(0, -1)
    Input.current.value = str
  }
  function handleEqual() {
    let expression = Input.current.value
    if (expression == '') {
      Input.current.value = ''
    } else {
      let expression = Input.current.value
      expression = expression.replace('x', '*')
      let result = eval(expression)
      Input.current.value = result
    }
  }

  // VARIABLES

  const [ThemeStyle, setThemeStyle] = useState(theme1)
  const [ThemeSelected, setThemeSelected] = useState(1)
  const buttonStyle = {
    backgroundColor: ThemeStyle.button,
    borderBottom: `5px solid ${ThemeStyle.buttonBorder}`,
    color: ThemeStyle.buttonfontcolor
  }
  const validInputsArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '-', '+', '.', 'x']
  const Input = useRef(null)

  // CODE

  useEffect(() => {
    window.addEventListener('keypress', KeyInputHandler)
    return () => {
      window.removeEventListener('keypress', KeyInputHandler)
    }
  }, [])

  // RETURN
  return (
    <div className='main_container flex' style={{ backgroundColor: ThemeStyle.body }}>

      <div className="calc_container flex">
        {/* HEADER SECTION */}
        <div className="header_section flex" style={{ color: ThemeStyle.fontcolor }}>
          <h1>Calculator</h1>
          <div className="Theme flex">
            <div>THEME</div>
            <div className="toggleThemeContainer flex">
              <div className="themeNumber flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
              <button onClick={handleThemeToggle} className="toggleSwitch flex" style={{ backgroundColor: ThemeStyle.buttonContainer }}>
                <div className='toggleSwitchKnob'
                  style={ThemeSelected == 1 ? { backgroundColor: ThemeStyle.equal } : { backgroundColor: ThemeStyle.buttonContainer }}
                ></div>
                <div className='toggleSwitchKnob'
                  style={ThemeSelected == 2 ? { backgroundColor: ThemeStyle.equal } : { backgroundColor: ThemeStyle.buttonContainer }}
                ></div>
                <div className='toggleSwitchKnob'
                  style={ThemeSelected == 3 ? { backgroundColor: ThemeStyle.equal } : { backgroundColor: ThemeStyle.buttonContainer }}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* INPUT SECTION */}
        <div className="input_section flex" style={{ backgroundColor: ThemeStyle.input }} >
          <input ref={Input} type="text" id="Calc_Input" placeholder='0' style={{ color: ThemeStyle.fontcolor }} onFocus={() => {
            Input.current.blur()
          }} />
        </div>

        {/* BUTTON SECTION */}
        <div className="button_section" style={{ backgroundColor: ThemeStyle.buttonContainer }}>
          <div className="div">
            <div className="row row-cols-4">
              <div className="col flex"><button onClick={() => { Appender('7') }} style={buttonStyle}>7</button></div>
              <div className="col flex"><button onClick={() => { Appender('8') }} style={buttonStyle}>8</button></div>
              <div className="col flex"><button onClick={() => { Appender('9') }} style={buttonStyle}>9</button></div>
              <div className="col flex"><button style={{ backgroundColor: ThemeStyle.button2, color: 'white', fontSize: '24px', borderBottom: `5px solid ${ThemeStyle.button2Border}` }} onClick={handleDel}>DEL</button></div>
            </div>
            <div className="row row-cols-4">
              <div className="col flex"><button onClick={() => { Appender('4') }} style={buttonStyle}>4</button></div>
              <div className="col flex"><button onClick={() => { Appender('5') }} style={buttonStyle}>5</button></div>
              <div className="col flex"><button onClick={() => { Appender('6') }} style={buttonStyle}>6</button></div>
              <div className="col flex"><button onClick={() => { Appender('+') }} style={buttonStyle}>+</button></div>
            </div>
            <div className="row row-cols-4">
              <div className="col flex"><button onClick={() => { Appender('1') }} style={buttonStyle}>1</button></div>
              <div className="col flex"><button onClick={() => { Appender('2') }} style={buttonStyle}>2</button></div>
              <div className="col flex"><button onClick={() => { Appender('3') }} style={buttonStyle}>3</button></div>
              <div className="col flex"><button onClick={() => { Appender('-') }} style={buttonStyle}>-</button></div>
            </div>
            <div className="row row-cols-4">
              <div className="col flex"><button onClick={() => { Appender('.') }} style={buttonStyle}>.</button></div>
              <div className="col flex"><button onClick={() => { Appender('0') }} style={buttonStyle}>0</button></div>
              <div className="col flex"><button onClick={() => { Appender('/') }} style={buttonStyle}>/</button></div>
              <div className="col flex"><button onClick={() => { Appender('x') }} style={buttonStyle}>x</button></div>
            </div>
            <div className="row row-cols-2">
              <div className="col flex"><button style={{ backgroundColor: ThemeStyle.button2, color: 'white', fontSize: '24px', borderBottom: `5px solid ${ThemeStyle.button2Border}` }} onClick={handleReset}>RESET</button></div>
              <div className="col flex"><button style={{ backgroundColor: ThemeStyle.equal, color: `${ThemeSelected == 3 ? 'black' : 'white'}`, borderBottom: `5px solid ${ThemeStyle.equalBorder}` }} onClick={handleEqual}>=</button></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
