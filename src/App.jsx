import { styled } from "@mui/material";
import Board from "./base/Board/Board";

const AppWrapper = styled('div')({
  
  'h1': {
    textAlign: 'center'
  }
});

function App() {

  return (
    <AppWrapper>
      <h1>Team Board</h1>
      <Board />
    </AppWrapper>
  )
}

export default App
