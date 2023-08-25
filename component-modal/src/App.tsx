import { useModal } from './Modal/hooks'
import Modal from './Modal/Modal';

function App() {
  const [open, { openModal, closeModal }] = useModal();

  return (
    <div className='flex items-center justify-center h-screen mt-12'>
      <button
        type='button'
        className='py-1 px-4 bg-zinc-900 text-zinc-100 rounded'
        onClick={openModal}
      >
        OPEN MODAL
      </button>

      <Modal 
        modalColor='white'
        modalSize='lg'
        modalPosition='center'
        open={open}
        onClose={closeModal}
        title='Example Modal'
        content={
          <div>
            <h4 className='mb-8'>Example Content Modal</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab provident obcaecati magnam. Dolores mollitia eius vitae exercitationem nihil doloremque veniam!
            </p>
          </div>
        }
        footer={
          <button
            type='button'
            className='py-2 px-6 rounded bg-slate-500 text-zinc-100'
            onClick={closeModal}
          >
            Close
          </button>
        }
      />
    </div>
  );
};

export default App