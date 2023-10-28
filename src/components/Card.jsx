export default function Card({ children }) {
  return (
    <div className="h-2/3 w-[95%] sm:max-w-2xl mt-5 rounded-[30px] backdrop-blur-md bg-white/20 flex flex-col items-center justify-center text-white text-3xl sm:text-5xl">
      {children}
    </div>
  );
}
