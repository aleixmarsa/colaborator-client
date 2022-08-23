


function LoadingSpinner (){
return(
    <button
    type="button"
    className="absolute left-0 right-0 top-0 bottom-0 m-auto w-fit h-fit inline-flex items-center justify-center px-3 py-3 font-light text-2xl shadow rounded-lg text-white bg-mainColor transition ease-in-out duration-150 cursor-not-allowed"
    disabled
  >
    <svg
      className="animate-spin -ml-1 mr-3 h-7 w-7 text-white"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    Loading...
  </button>
)
}

export default LoadingSpinner