

export function Header(){

    return (
        <a href="https://github.com/jcdiegolopez/cardGame">
        <div className="justify-between bg-stone-950 flex w-full gap-5 px-20 py-7 items-start max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <div className="justify-center items-center flex gap-0.5 mt-1.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/40a100d4d0bcb34e9284e5d98bf3e1e792a6189c424be48b5a05382e372d72ce?"
            className="aspect-square object-contain object-center w-[18px] fill-sky-500 overflow-hidden shrink-0 max-w-full my-auto"
          />
          <div className="text-white text-xl font-semibold capitalize self-stretch grow whitespace-nowrap">
            TODO LIST APP
          </div>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-1.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/86b9a10021b4653c8349342f2130dc420a833e58a264fb8ac616767c83a70ec8?"
            className="aspect-square object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-white text-xl font-semibold capitalize grow whitespace-nowrap mt-1.5 self-start">
            Repository
          </div>
        </div>
      </div>
      </a>
    );
}