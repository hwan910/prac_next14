export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 w-full rounded-2xl ">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-1">
              In transit
            </span>
            <span className="text-4xl font-semibold ">Coolblue</span>
          </div>
          <div className="size-12 bg-orange-400 rounded-full"></div>
        </div>
      </div>
    </main>
  );
}
