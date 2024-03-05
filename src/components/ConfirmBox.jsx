const ConfirmBox = ({ title, closeDialog, deleteFunction }) => {
  return (
    <div className="fixed inset-0 z-40 flex min-h-full items-center overflow-y-auto overflow-x-hidden transition">
      <div
        aria-hidden="true"
        className="fixed inset-0 h-full w-full cursor-pointer bg-black/50"
      ></div>

      <div className="pointer-events-none relative my-auto w-full cursor-pointer p-4 transition">
        <div className="pointer-events-auto relative mx-auto w-full max-w-sm cursor-default rounded-xl bg-white py-2 dark:bg-gray-800">
          <button
            tabIndex="-1"
            type="button"
            className="absolute right-2 top-2 rtl:left-2 rtl:right-auto"
            onClick={closeDialog}
          >
            <svg
              title="Close"
              tabIndex="-1"
              className="h-4 w-4 cursor-pointer text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>

          <div className="space-y-2 p-2">
            <div className="space-y-2 p-4 text-center dark:text-white">
              <h2
                className="text-xl font-bold tracking-tight"
                id="page-action.heading"
              >
                Delete &quot;{title}&quot;
              </h2>

              <p className="text-gray-500">
                Are you sure you would like to do this?
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div
              aria-hidden="true"
              className="border-t px-2 dark:border-gray-700"
            ></div>

            <div className="px-6 py-2">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
                <button
                  type="button"
                  className="focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:focus:text-primary-400 dark:focus:border-primary-400 inline-flex min-h-[2.25rem] items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-800 outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:focus:bg-gray-800 dark:focus:ring-offset-0"
                >
                  <span className="flex items-center gap-1">
                    <span className="" onClick={closeDialog}>
                      Cancel
                    </span>
                  </span>
                </button>

                <button
                  type="submit"
                  className="inline-flex min-h-[2.25rem] items-center justify-center gap-1 rounded-lg border border-transparent bg-red-600 px-4 py-1 text-sm font-medium text-white shadow outline-none transition-colors hover:bg-red-500 focus:bg-red-700 focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700 dark:focus:ring-offset-0"
                >
                  <span
                    className="flex items-center gap-1"
                    onClick={deleteFunction}
                  >
                    <span className="">Confirm</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
