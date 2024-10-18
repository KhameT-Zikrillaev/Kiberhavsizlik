import { useState,useEffect } from 'react'
import './index.css'
import prog from './assets/images/predator-icon.png'
import work from './assets/images/def.svg'
import circle from './assets/images/circle-icon.svg'
import tick from './assets/images/tick-icon.svg'
import fonright from './assets/images/right-fon-2.png'
import fonleft from './assets/images/left-fon.png'
function App() {
  const [selectedWork, setSelectedWork] = useState([]);
  const [activeModal, setActiveModal]= useState(true)
  const [activeModalSend, setActiveModalSend]= useState(false)
  const [username,setUsername] = useState('')
  const [usertelegram,setUserTelegram] = useState('')
  const [userphone,setUserphone] = useState('')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~telegram token~~~~~~~~~~~~~~~~~~~~~~
  const token = '6821529277:AAGNNfb4UV3FwUBKJsLo2tXFWp0Yy_2uyLU';
  const chatId = -1002351344410;
// ~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value); 
  };
// ~~~~~~~~~~~usertelegrame
  const handleUsertelegramChange = (event) => {
    setUserTelegram(event.target.value); 
  };
// ~~~~~~~~~~~userphone
  const handleUserphoneChange = (event) => {
    const inputValue = event.target.value;
  const sanitizedValue = inputValue.replace(/\D/g, '');
  if (sanitizedValue.length <= 9) {
    setUserphone(sanitizedValue);
  }
  };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~checkbox work~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const [isTashkentChecked, setIsTashkentChecked] = useState(false);
const [isOnlaynChecked, setIsOnlaynChecked] = useState(false);


useEffect(() => {
    const tashkentCheckbox = document.getElementById("Tashkent");
    const onlaynCheckbox = document.getElementById("onlayn");

    tashkentCheckbox.required = !isOnlaynChecked;
    onlaynCheckbox.required = !isTashkentChecked;



}, [isTashkentChecked, isOnlaynChecked]);
const handleCheckboxChange2 = (event) => {
  const time = event.target.value;

  if (event.target.checked) {
      setSelectedWork((prevSelectedWork) => {
          const updatedWork = [...prevSelectedWork, time];
          console.log('Выбранные времена:', updatedWork.join(', '));
          return updatedWork;
      });
  } else {
      setSelectedWork((prevSelectedWork) => {
          const updatedWork = prevSelectedWork.filter((t) => t !== time);
          console.log('Выбранные времена:', updatedWork.join(', '));
          return updatedWork;
      });
  }

  if (event.target.id === "Tashkent") {
      setIsTashkentChecked(event.target.checked);
  } else if (event.target.id === "onlayn") {
      setIsOnlaynChecked(event.target.checked);
  }
};
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~send submit~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const submit = (event) => {
    event.preventDefault();
    if (userphone.length < 9) {
      alert('Telefon raqami kamida 9 ta raqamdan iborat bo\'lishi kerak.');
      return;
    }
    
    const fullMessage = `Name: ${username}, telephone: ${userphone}, Telegram : ${usertelegram}, Work:${selectedWork}`;
    console.log(fullMessage);
  

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fullMessage}`)
      .then(response => response.json())
      .then(data => {
        setUsername('');
        setUserphone('');
        setUserTelegram('');
        setSelectedWork('');
        event.target.reset();
        setActiveModalSend(true)
        setTimeout(()=>{
          setActiveModalSend(false)
        },1000)
      })
      .catch(error => {
        console.error('Ошибка при отправке сообщения:', error);
      });
  };
  return (
    <>
{/* ~~~~~~~~~~~~~~~~~~~~~~ modal window~~~~~~~~~~~~~~~~~ */}
    <div className={`modal w-full bg-black bg-opacity-45 mt-[-100%] flex p-2 justify-center items-center h-dvh fixed z-[99] 
    ${activeModal ? 'modal-animation-active' : 'modal-animation-nonactive'}`}>
     <div className="modal-items rounded-xl flex flex-col gap-2  py-2 p480:py-8 px-2 p480:px-10 bg-white max-w-[500px] w-full">
      <h3 className='text-black   p480:text-[24px] text-center'>Siz Toshkent shahrida doimiy yashaysizmi?</h3>
      <button className='modal-btn p-3 rounded-full border border-red-400 max-w-[300px] w-full mx-auto bg-white hover:bg-gray-200 hover:border-gray-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg' onClick={() => setActiveModal(false)}>Ha toshkent shahrida yashayman!</button>
     
      <a href="https://t.me/it_time" className='modal-btn p-3 rounded-full border text-center border-red-400 max-w-[300px] w-full mx-auto bg-white hover:bg-gray-200 hover:border-gray-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'>Yo'q, boshqa shaharda yashayman!</a>

     </div>
    </div>
    {/* ~~~~~~~~~~~~~~~~~~~~~~modal send~~~~~~~~~~~~~~~~~~~~~~~ */}
    {activeModalSend && <div className={` w-full bg-black bg-opacity-45 flex p-2 justify-center items-center h-dvh fixed z-[99] 
    `}>
     <div className="modal-items rounded-xl flex justify-center items-center p480:px-10 ">
      <img className='w-[200px] ' src={tick} alt="" />
     </div>
    </div>
    }



               {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~content~~~~~~~~~~~~~~~~~~~~~~~~ */}
               
      <div className='wrapper relative w-full h-full  flex  flex-col-reverse p992:flex-row'>
      
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~left content~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <div className="left-content relative   z-20 w-full text-white flex flex-col gap-2  p480:gap-6  p992:gap-11 justify-center items-center p992:items-start   pl-0  p992:pl-10   p992:py-16 p992:w-[50%]  p992:h-screen ">
          {/* ~~~~~~~~~~~~~~~~~~form send~~~~~~~~~~~~~~~~~~~~ */}
        <form onSubmit={submit} className='flex relative z-20 flex-col gap-2 mt-2 p992:ml-[100px] p-2 max-w-[400px] w-full' action="">
             <h3 className='text-[20px] text-center mt-10 p992:mt-0'><b className='font-[TeletactileRus] text-green-500'>Kiberhavfsizlik</b> kursini o'qish uchun <b>Toshkent</b> shahriga kela olsangiz formani to'ldiring</h3>
            <input required className='p-2 text-black w-full rounded-xl outline-none border border-red-900' type="text" placeholder='ismingiz' onChange={handleUsernameChange} />
            <input className='p-2 w-full text-black rounded-xl outline-none border border-red-900' type="text" placeholder='Telegram' onChange={handleUsertelegramChange}/>
            <input required className='p-2 text-black w-full rounded-xl outline-none border border-red-900' type="text" placeholder='990000000' value={userphone}
              onInput={handleUserphoneChange}  />
            <span className='text-center'>Bizning kursimiz Toshkent shaharda joylashgan.<br/>Agar aniq kelib o’qiy olsangiz, Toshkentni belgilang.</span>

            <div className="checkbox-content-first flex justify-center gap-2 mx-auto">
            <div className='flex items-center gap-2'>
                    <input
                        id="Tashkent"
                        type="checkbox"
                        value="Toshkentga bora olaman"
                        onChange={handleCheckboxChange2}
                    />
                    <label htmlFor="Tashkent">Toshkentga bora olaman</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input
                        id="onlayn"
                        type="checkbox"
                        value="Onlayn"
                        onChange={handleCheckboxChange2}
                    />
                    <label htmlFor="onlayn">Onlayn</label>
                </div>

            </div>
            <span className='block w-[70%] linear mx-auto h-[2px]'></span>        
           <button type="submit" className='p-2 mt-2 rounded-xl  font-semibold transition transform hover:scale-105 hover:bg-red-600 hover:text-yellow-400 animate-text-pulse duration-1000'>
            Yuborish
           </button>
   
               </form>
               <div className='flex relative z-10 gap-2 items-center pb-4 ml-4'><img className=' p992:ml-2 w-12 p992:w-14' src={prog} alt="" /><p className='text-prof font-[TeletactileRus] text-[14px] p992:text-[16px]'>Professional dasturchi bo'lmoqchi bo'lsangiz <br/> hoziroq bizga qo'shiling!</p></div>
               <img className='right-img w-full h-full absolute z-0 object-cover opacity-15' src={fonleft} alt="" />
        </div>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~right content~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <div className="right-content pb-10  pt-10 p992:pt-0 relative w-full  p992:w-[50%] flex flex-col gap-10 justify-center items-center px-2 p992:pr-16">
               {/* <div><img className='max-w-[400px] p-2 w-full mt-[-30px] p768:mt-[-50px]' src={logo} alt="" /></div> */}
          <div className='flex gap-4 items-center'><img className=' w-16 p992:w-20' src={work} alt="" />
          <span className='text-[18px] font-[TeletactileRus]  p480:text-[24px] p992:text-[32px] text-white font-semibold  text-animated'>
          Kiberhavfsizlikni<br />o'rganmoqchimisiz?
            </span>
           </div>
          <ul className='flex relative z-10 mb-4 flex-col px-2 p480:px-0 gap-2 text-white font-semibold mt-[10px] p992:mt-[30px]'>
          <h2 className=' text-[20px] font-[TeletactileRus] mb-2 '>Bizning kursda:</h2>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='circle-icon w-6' src={circle} alt="" />System administration</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='circle-icon w-6' src={circle} alt="" />Virusologiya</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='circle-icon w-6' src={circle} alt="" />Security operation</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='circle-icon w-6' src={circle} alt="" />Ethical hacker</li>
            <li className='flex font-serif gap-2 items-center animated-gradient-text-li mr-[0px] p992:mr-[300px] p1200:mr-[0px]'><img className='circle-icon w-6' src={circle} alt="" />pentestirlik</li>
          </ul>
          {/* <div className='flex relative z-10 gap-2 items-center'><img className='ml-2 w-16' src={prog} alt="" /><p className='text-prof text-white text-[18px] mr-[0px] p1200:mr-[0px]'>Professional dasturchi bo'lmoqchi bo'lsangiz <br/> hoziroq bizga qo'shiling!</p></div> */}
   

           <img className='right-img w-full h-full absolute z-0 opacity-15' src={fonright} alt="" />
         </div>  
    

      </div>

     

    </>
  )
}

export default App
