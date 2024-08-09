export default function Home() {
  return (
    <main
      className="bg-gray-100 h-screen flex items-center justify-center p-5
      xxs:bg-pink-800
      xs:bg-pink-600
      sm:bg-red-200
      md:bg-green-200
      lg:bg-blue-200
      xl:bg-blue-300
      2xl:bg-blue-400
      "
    >
      <div className="test ">
        {['Nico', 'Me', 'You'].map((person, index) => (
          <div
            key={index}
            className="border-b-2 p-5 first:border-t-2 flex items-center group "
          >
            <div className="mr-2 group-hover:bg-gray-400">{person}</div>
            <div className="bg-red-400  text-center size-6 rounded-full text-white  animate-spin group-hover:animate-none">
              🎲
            </div>
            <button className="btn btn-primary btn-sm">Button</button>
            <input />
          </div>
        ))}
      </div>
    </main>
  );
}
