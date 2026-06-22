import authorImage from "../assets/hero.png";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      <div
        className="
          grid
          items-center
          justify-center
          gap-10
          lg:grid-cols-[260px_380px_260px]
        "
      >

        {/* LEFT CONTENT */}
        <div>
          <h1
            className="
              text-4xl
              font-black
              leading-[1.05]
              tracking-[-0.04em]
              text-slate-950
              lg:text-5xl
            "
          >
            Stay
            <br />
            Informed,
            <br />
            Stay Inspired
          </h1>


          <p
            className="
              mt-6
              text-sm
              leading-7
              text-slate-600
            "
          >
            Discover a world of knowledge at your fingertips with fresh
            stories, smart tips, and daily inspiration from the world of pets.
          </p>

        </div>



        {/* CENTER IMAGE */}
        <div className="flex justify-center">

          <img
            src={authorImage}
            alt="Person with cat"
            className="
              h-[560px]
              w-[380px]
              rounded-[2rem]
              object-cover
            "
          />

        </div>



        {/* RIGHT AUTHOR */}
        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-slate-500
            "
          >
            Author
          </p>


          <h2
            className="
              mt-3
              text-2xl
              font-semibold
              text-slate-950
            "
          >
            Thompson P.
          </h2>


          <p
            className="
              mt-5
              text-sm
              leading-7
              text-slate-600
            "
          >
            I am a pet enthusiast and freelance writer who specializes in
            animal behavior and care. With a deep love for cats, I enjoy
            sharing insights on feline companionship and wellness.
          </p>


          <p
            className="
              mt-4
              text-sm
              leading-7
              text-slate-600
            "
          >
            When I'm not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>


        </div>

      </div>

    </section>
  );
}