export default function Form({ name, setName, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="h-16 w-full backdrop-blur-md bg-white/20 rounded-3xl flex items-center"
    >
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter an artist name..."
        autoFocus
        className="w-3/5 text-xl ml-auto bg-transparent focus:outline-none text-white sm:text-4xl"
      />
      <button
        onClick={handleSubmit}
        className="w-24 h-3/5 mr-4 bg-[#6A6A6A] text-md sm:text-lg uppercase rounded-2xl hover:btn-hover"
      >
        Search
      </button>
    </form>
  );
}
