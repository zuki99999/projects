import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './components/NavBar';
import { decrement,increment,multiply, divide ,setZero} from '../redux/counter/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
 
    <>
    
      <NavBar/>
      <div>
        
        <button onClick={()=>dispatch(decrement())}>-</button>
        currentlt count is {count}
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(multiply())}>*</button>
        <button onClick={()=>dispatch((divide()))}>/</button>
        <button onClick={()=>dispatch((setZero()))}>setZero</button>
      </div>
    
    </>
  )
}

export default App
