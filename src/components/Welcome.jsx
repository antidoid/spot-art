import smile from "../assets/smile.svg";

export default function Welcome() {
  return (
    <div className="h-full flex flex-col justify-center">
      <h2 className="text-white text-3xl sm:text-5xl">Welcome to SpotArt</h2>
      <img src={smile} className="w-[250px] mt-10 mx-auto" />
    </div>
  );
}
