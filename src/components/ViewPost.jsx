import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import postsApi from "@/services/postsApi";
import blogPosts from "@/data/blogPosts";

export default function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [comment, setComment] = useState("");

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
        const apiPost = response?.data;

        if (apiPost && Object.keys(apiPost).length > 0) {
          setPost(apiPost);
        } else {
          const localPost = blogPosts.find(
            (item) => String(item.id) === String(postId),
          );
          if (localPost) {
            setPost(localPost);
          } else {
            setError("Article not found.");
          }
        }
      } catch (err) {
        console.error(err);
        const localPost = blogPosts.find(
          (item) => String(item.id) === String(postId),
        );
        if (localPost) {
          setPost(localPost);
        } else {
          setError("Unable to load the article. Please try again.");
        }
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

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please write a comment before you send.");
      return;
    }

    toast.success("Your comment has been submitted.");
    setComment("");
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

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Copy size={16} /> Copy
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white p-1 shadow-sm">
            <button
              type="button"
              aria-label="Share on Facebook"
              onClick={() => openShare("https://www.facebook.com/share.php?u=")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
            >
              <FaFacebook size={16} />
            </button>
            <button
              type="button"
              aria-label="Share on LinkedIn"
              onClick={() =>
                openShare(
                  "https://www.linkedin.com/sharing/share-offsite/?url=",
                )
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
            >
              <FaLinkedin size={16} />
            </button>
            <button
              type="button"
              aria-label="Share on Twitter"
              onClick={() => openShare("https://www.twitter.com/share?&url=")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
            >
              <FaXTwitter size={16} />
            </button>
          </div>
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
              <div className="markdown text-base leading-8">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>

            <section className="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-950">Comment</h2>
              <p className="mt-2 text-sm text-slate-600">
                Share your thoughts about this article.
              </p>

              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="What are your thoughts?"
                className="mt-4 min-h-[140px] w-full resize-none rounded-3xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />

              <button
                type="button"
                onClick={handleCommentSubmit}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Send
              </button>
            </section>
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
