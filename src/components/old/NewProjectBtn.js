const NewProjectBtn = (props) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 xl:w-full"
      onClick={props.handleNewProjectBtn}
    >
      New Project
    </button>
  );
};

export default NewProjectBtn;
