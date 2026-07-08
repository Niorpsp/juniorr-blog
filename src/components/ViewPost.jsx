import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Facebook, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import postsApi from "@/services/postsApi";

export default function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await postsApi.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError("Unable to load the article. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      toast.success("Copied! This article has been copied to your clipboard.");
    } catch (err) {
      console.error(err);
      toast.error("Could not copy link. Please try again.");
    }
  };

  const openShare = (baseUrl) => {
    const url = shareUrl || window.location.href;
    window.open(
      `${baseUrl}${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-slate-600">
        Loading article...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-slate-600">
        <p>{error || "Article not found."}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Back to homepage
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <Copy size={16} /> Copy
          </button>

          <button
            type="button"
            onClick={() => openShare("https://www.facebook.com/share.php?u=")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <Facebook size={16} /> Facebook
          </button>
          <button
            type="button"
            onClick={() =>
              openShare("https://www.linkedin.com/sharing/share-offsite/?url=")
            }
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <Linkedin size={16} /> LinkedIn
          </button>
          <button
            type="button"
            onClick={() => openShare("https://www.twitter.com/share?&url=")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <Twitter size={16} /> Twitter
          </button>
        </div>
      </div>

      <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
            {post.category}
          </span>
          <span className="text-sm text-slate-500">{post.date}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-slate-600">{post.description}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-[1.5rem] object-cover"
            />

            <div className="mt-8 space-y-6 text-slate-700">
              <div className="whitespace-pre-line text-base leading-8">
                {post.content}
              </div>
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <div className="mb-4 text-sm uppercase tracking-[0.25em] text-slate-500">
              Author
            </div>
            <div className="text-lg font-semibold text-slate-950">
              {post.author}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This article is part of the personal blog collection and can be
              shared using the buttons above.
            </p>
          </aside>
        </div>
      </article>
    </section>
  );
}
