import { Particles, Card, Form } from "./components";

export default function App() {
  return (
    <main className="h-screen font-inter bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply flex flex-col items-center justify-center">
      <Particles />
      <Form />
      <Card>Welcome to SpotArt</Card>
    </main>
  );
}
