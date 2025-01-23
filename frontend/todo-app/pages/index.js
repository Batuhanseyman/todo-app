import TodoCard from "@/components/TodoCard";

const todos = [
  {text : 'Bulaşıkları Yıka', id : 1 },
  {text: 'Projeyi tamamla', id : 2},
  {text : 'Yatağını topla', id : 3}
];

export default function Home() {

  return (
    <>

      <div
      className='min-h-screen  w-full flex flex-col items-center  bg-gradient-to-r from-blue-600 to-emerald-400'>
      <div className="self-end mb-4 mt-3">
        <button className="border rounded-lg bg-red-600 text-center p-2  text-white hover:bg-red-700">
          Sign Out
        </button>
      </div>
      <div className="bg-white  shadow-lg  border-solid rounded-3xl p-16 w-10/12 md:w-9/12 xl:w-5/12 flex flex-col lg:mt-24 items-center content-center">
            <h1 className="text-3xl font-bold text-center
            text-gray-900 mb-6">Todo List</h1>
          <div className="mb-4 flex">
            <input type="text" placeholder="Add a new todo"
            className=" px-3 py-2 border rounded-l-2xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"/>

            <button className="bg-blue-500 text-white
            px-4 py-2 rounded-r-2xl hover:bg-blue-600">Add</button>

          </div>
        <TodoCard todos = {todos}/>
        </div>
      </div>     
    </>
  );
}
