import React from "react";

interface Post {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  author: string; //is actually "User", which is another model
  authorName: string;
}

interface shownPost {
  title: string;
  content: string;
}

/*

model Post {
  id          Int       @id @default(autoincrement())
  sub         String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  title       String    @db.VarChar(255)
  content     String?
  published   Boolean   @default(false)
  author      User      @relation(fields: [authorName], references: [nickname])
  authorName  String    // relation scalar field  (used in the `@relation` attribute above)
  
}

*/

export default function MainPage() {
  const [content, setContent] = React.useState<shownPost[]>([]);
  function clickAss() {
    fetch("http://localhost:8080/main")
      .then((response) => response.json())
      .then((data: Array<Post>) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          setContent((prev) => [
            { title: data[i].title, content: data[i].content },
            ...prev,
          ]);
        }
      });
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <button
        onClick={clickAss}
        className="fixed w-20 h-10 top-1/2 right-0 bg-blue-500 rounded-sm hover:bg-blue-700"
      >
        Button
      </button>
      <div id="header" className="bg-blue-400 w-100 h-10 flex ">
        <div className="flex w-1/4 h-100 justify-around">
          <div className="grid place-items-center text-xl font-bold hover:text-2xl hover:text-blue-900 transition-all ease-linear duration-75">
            RedditTwo
          </div>
          <div className="grid place-items-center">
            <a href="#">Link 1</a>
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
            <img
              src="/avatar icon.jpg"
              className="object-contain rounded-full"
            />
          </div>
        </div>
      </div>
      <div id="main" className="bg-gray-700 flex-grow p-5">
        <div className="flex h-full w-full">
          <div className="flex-col w-9/12 h-full bg-gray-800 text-white p-5">
            {content.map((e, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear"
                >
                  <h1 className="text-2xl text-blue-400 text-center">
                    {e.title}
                  </h1>
                  <p className="text-center">{e.content}</p>
                </div>
              );
            })}
          </div>
          <div className="flex-grow bg-gray-800 ml-5">
            This is the sidebar on the left
          </div>
        </div>
      </div>
    </div>
  );
}
