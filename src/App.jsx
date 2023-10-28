import { Particles, Card, Form } from "./components";

export default function App() {
  return (
    <div className="w-screen flex justify-center bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply">
      <Particles />
      <main className="w-[95%] sm:max-w-2xl h-screen font-inter flex flex-col justify-center shadow-2xl">
        <h1 className="font-mono text-white text-3xl ml-4 mb-4">SpotArt</h1>
        <Form />
        <Card>Welcome to SpotArt</Card>
      </main>
    </div>
  );
}
