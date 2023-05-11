function Ribbon({ message }: { message: string }) {
  return (
    <div className="scale-[0.65] ribbon-container h-[150px] w-[150px] absolute flex items-center justify-center top-[-33.35px] left-[-33.35px] overflow-hidden">
      <div className="absolute h-[45px] w-[150%] bg-[#EB102F] -rotate-[45deg] translate-y-[-20px] translate-x-[-10px] z-10 flex items-center justify-center text-white text-xl uppercase tracking-widest">
        <h4> {message} </h4>
      </div>
      <div className="absolute h-[10px] w-[10px] bottom-0 left-0 z-0 bg-[#582c32]"></div>
      <div className="absolute h-[10px] w-[10px] top-0 right-0 z-0 bg-[#582c32]"></div>
    </div>
  );
}

export default Ribbon;
