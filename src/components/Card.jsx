export default function Card({ children }) {
  return (
    <div className="min-h-[67%] w-full mt-5 mb-8 rounded-[30px] backdrop-blur-md bg-white/20 flex flex-col items-center">
      {children}
    </div>
  );
}
