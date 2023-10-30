export default function Card({ children }) {
  return (
    <div className="h-2/3 w-full mt-5 rounded-[30px] backdrop-blur-md bg-white/20 flex flex-col items-center">
      {children}
    </div>
  );
}
