function HeroSection() {
  return (
    <section className="bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-24">
        <div className="grid gap-10 rounded-[2rem] bg-white/90 p-6 shadow-[0_60px_120px_-60px_rgba(15,23,42,0.2)] md:grid-cols-[1.2fr_1fr_0.9fr] md:p-8 lg:p-12">
          <div className="flex flex-col justify-center gap-6 text-center md:text-left">
            <div className="text-sm uppercase tracking-[0.36em] text-slate-400">Stay informed</div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Stay Informed,
                <br />
                Stay Inspired
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Discover a world of knowledge at your fingertips. Your daily dose of inspiration and information.
              </p>
            </div>
          </div>

          <div className="mx-auto flex max-w-md items-center justify-center rounded-[2rem] bg-slate-100 p-3 shadow-lg shadow-slate-200/70 sm:p-5 md:mx-0">
            <img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt="Author with a cat in nature"
              className="h-[320px] w-full rounded-[1.75rem] object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Author</p>
            <h2 className="text-2xl font-semibold text-slate-950">Thompson P.</h2>
            <p className="text-sm leading-7 text-slate-600">
              I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
            </p>
            <p className="text-sm leading-7 text-slate-600">
              When I’m not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
