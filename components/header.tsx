export const Header = () => {
  return (
    <div id="header" className="bg-blue-400 w-100 h-10 flex ">
      <div className="flex w-1/4 h-100 justify-around">
        <div className="grid place-items-center text-xl font-bold hover:text-2xl hover:text-blue-900 transition-all ease-linear duration-75">
          <a href="main">RedditTwo</a>
        </div>
        <div className="grid place-items-center">
          <a href="createpost">Create Post</a>
        </div>
        <div className="grid place-items-center">
          <a href="#">Link 2</a>
        </div>
      </div>
      <div className="flex h-100 w-2/4 p-1">
        <input className="w-3/4 h-100" />
        <button type="submit" className="w-1/5 h-100 bg-gray-300 ml-1">
          Search
        </button>
      </div>
      <div className="flex h-100 w-1/4 justify-end place-items-center">
        <h3>Yeaaah dude your profile here or whatever</h3>

        <div className="w-10 h-10">
          <img src="avatar icon.jpg" className="object-contain rounded-full" />
        </div>
      </div>
    </div>
  );
};
