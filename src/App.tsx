function App() {


    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form
                className="w-[400px] border border-black  p-4 flex flex-col"
                onSubmit={() => {
                    console.log("Submitted!");
                }}
            >
                <h2 className="text-lg font-bold mb-4 text-center">
                    OKR
                </h2>

                <input
                    type="text"
                    className="border border-black p-2 mb-3"
                    placeholder="Objectives"
                    name="objectives"
                />

                <input
                    type="text"
                    className="border border-black p-2 mb-4"
                    placeholder="Key Results"
                    name="keyResults"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 mb-2"
                >
                    Submit
                </button>

                <button
                    type="reset"
                    className="bg-red-400 text-white p-2"
                >
                    Clear
                </button>
            </form>
        </div>

    )
}

export default App
