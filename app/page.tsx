export default function Home() {
  return (
    <main
      className="bg-gray-100 h-screen flex items-center justify-center p-5
      sm:bg-red-200
      md:bg-green-200
      lg:bg-blue-200
      xl:bg-blue-300
      2xl:bg-blue-400
      "
    >
      <div
        className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2
      "
      >
        <input
          className=" pl-5 bg-gray-100 w-full rounded-full h-10 outline-none ring ring-transparent
          focus:ring-blue-400 focus:ring-offset-2 transition-shadow
          placeholder:drop-shadow-xl
          invalid:focus:bg-red-100
          invalid:focus:ring-red-500
          peer
          "
          type="email"
          required
          placeholder="Eamil address"
        />
        <span className="pl-5 hidden text-red-500 peer-invalid:block">
          올바른 형식이 아닙니다.
        </span>
        <button
          className=" bg-gradient-to-tr from-cyan-400 to-purple-400  text-white py-2 rounded-full md:px-8 

        peer-invalid:from-slate-400
        peer-invalid:to-red-400
        "
        >
          Submit
        </button>
      </div>
    </main>
  );
}
