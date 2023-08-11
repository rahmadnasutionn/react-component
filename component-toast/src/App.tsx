import { ToastContainer } from "./Toast/ToastContainer";
import { useToast } from "./Toast/use-toast";

function App() {
  const toast = useToast();

  const handleToast = () => {
    toast.add({
      id: 'unique-id',
      closeOnClick: true,
      pauseOnHover: true,
      progressColor: 'gradient',
      showProgress: true,
      color: 'white',
      titleColor: 'gray',
      shadowColor: 'gray',
      title: 'Example toast',
      description: 'example description',
      iconType: 'error'
    })
  }

  return (
    <div className="flex gap-4 items-center justify-center h-screen">
      <button 
        className="py-1.5 bg-gray-300 px-4 tracking-wider text-[18px] shadow-md uppercase"
        onClick={handleToast}
      >
        click me to see toast
      </button>
      <button 
        className="py-1.5 bg-gray-300 px-4 tracking-wider text-[18px] shadow-md uppercase"
        onClick={() => toast.remove('unique-id')}
      >
        Remove/Update Toast
      </button>
      <ToastContainer 
        position="top-right" 
      />
    </div>
  )
}

export default App;
