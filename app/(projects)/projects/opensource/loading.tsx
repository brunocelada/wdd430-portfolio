export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 flex-1 flex flex-col animate-pulse">
      {/* Page title */}
      <div className="h-10 w-72 bg-gray-200 rounded mb-4" />

      {/* Project cards */}
      <section className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((item) => (
          <article
            key={item}
            className="p-4 border-l-4 border-gray-300 bg-gray-50 rounded space-y-4"
          >
            {/* Project title */}
            <div className="h-7 w-2/3 bg-gray-200 rounded" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="h-4 w-24 bg-gray-200 rounded" />

              {[1, 2, 3, 4].map((tech) => (
                <div key={tech} className="h-7 w-20 bg-gray-200 rounded-full" />
              ))}
            </div>

            {/* Project link */}
            <div className="h-5 w-28 bg-gray-200 rounded" />
          </article>
        ))}
      </section>
    </main>
  );
}
