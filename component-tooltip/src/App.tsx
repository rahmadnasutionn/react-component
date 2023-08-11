import { Tooltip } from "./Tooltip"

function App() {

  return (
    <div className="flex items-center justify-center h-screen">
      <Tooltip content="This is a tooltip" position="top">
        <button className="py-1.5 bg-white px-4 tracking-wider text-[18px] shadow-md uppercase">
          hover me
        </button>
      </Tooltip>
    </div>
  )
}

export default App;
