import { useRef } from "react";
import ReactStars from "react-stars";

const FAKE_REVIEWS = [
  {
    id: "f1",
    name: "Aarav Sharma",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=AaravSharma&backgroundColor=3b82f6",
    rating: 5,
    course: "Full Stack Web Development",
    review: "Absolutely mind-blowing course! The instructor explains every concept so clearly. Went from zero to building full-stack apps in 3 months. Best investment ever! 🚀",
    date: "2 weeks ago",
  },
  {
    id: "f2",
    name: "Priya Mehta",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=PriyaMehta&backgroundColor=8b5cf6",
    rating: 5,
    course: "Machine Learning with Python",
    review: "The projects in this course are real-world and super relevant. I landed a job at a startup right after finishing! Cannot recommend enough.",
    date: "1 month ago",
  },
  {
    id: "f3",
    name: "Rohit Verma",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RohitVerma&backgroundColor=10b981",
    rating: 4.5,
    course: "React JS Masterclass",
    review: "Hands down the best React course out there. Loved the hooks deep-dive and the Redux toolkit section. A few videos could be shorter but overall 10/10.",
    date: "3 weeks ago",
  },
  {
    id: "f4",
    name: "Sneha Patel",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SnehaPatel&backgroundColor=f59e0b",
    rating: 5,
    course: "UI/UX Design Bootcamp",
    review: "I've taken 10+ design courses and THIS is the one. The Figma tutorials are incredibly detailed. My portfolio completely transformed after this. ✨",
    date: "5 days ago",
  },
  {
    id: "f5",
    name: "Karan Singh",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=KaranSingh&backgroundColor=ef4444",
    rating: 5,
    course: "Data Structures & Algorithms",
    review: "Cracked Google interviews after completing this! The problem-solving approach taught here is phenomenal. Every CS student needs this.",
    date: "2 months ago",
  },
  {
    id: "f6",
    name: "Ananya Roy",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=AnanyaRoy&backgroundColor=06b6d4",
    rating: 4.5,
    course: "Node.js & Express Backend",
    review: "Finally a backend course that doesn't bore you to death! Real projects, real authentication, real deployment. My confidence skyrocketed. 💻",
    date: "1 week ago",
  },
  {
    id: "f7",
    name: "Vikram Nair",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=VikramNair&backgroundColor=f97316",
    rating: 5,
    course: "Cloud Computing AWS",
    review: "Got AWS certified in 6 weeks! The course structure is perfect — theory followed immediately by hands-on labs. Worth every penny 🏆",
    date: "3 months ago",
  },
  {
    id: "f8",
    name: "Deepika Joshi",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=DeepikaJoshi&backgroundColor=ec4899",
    rating: 5,
    course: "Python for Data Analysis",
    review: "Amazing! The pandas and matplotlib sections alone are worth the entire price. I now automate reports at work that used to take me 4 hours. LOVE this! 🔥",
    date: "2 weeks ago",
  },
  {
    id: "f9",
    name: "Arjun Kapoor",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=ArjunKapoor&backgroundColor=6366f1",
    rating: 4.5,
    course: "Ethical Hacking & Cybersecurity",
    review: "Extremely well structured. Moved from complete beginner to understanding real pentesting techniques. The CTF challenges are the highlight! 🎯",
    date: "1 month ago",
  },
  {
    id: "f10",
    name: "Pooja Iyer",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=PoojaIyer&backgroundColor=14b8a6",
    rating: 5,
    course: "JavaScript Advanced Concepts",
    review: "My JS skills jumped from beginner to advanced in weeks. Closures, prototypes, async/await — all explained with beautiful animations. Simply brilliant!",
    date: "4 days ago",
  },
  {
    id: "f11",
    name: "Rahul Gupta",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RahulGupta&backgroundColor=a855f7",
    rating: 5,
    course: "DevOps & Docker Masterclass",
    review: "CI/CD pipelines, Docker, Kubernetes — this course covers it all. I got a DevOps role at a product company right after. The instructor is top-notch!",
    date: "6 weeks ago",
  },
  {
    id: "f12",
    name: "Meera Desai",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=MeeraDesai&backgroundColor=f43f5e",
    rating: 4.5,
    course: "Digital Marketing Strategy",
    review: "Practical, no fluff, real results. Ran my first Google Ads campaign with 340% ROAS after this course. The SEO module alone changed my business! 📈",
    date: "2 months ago",
  },
  {
    id: "f13",
    name: "Siddharth Bose",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SiddharthBose&backgroundColor=0ea5e9",
    rating: 5,
    course: "Mobile App Development Flutter",
    review: "Built and shipped my first app to Play Store within 2 months of finishing this course! The widgets section and state management chapters are gold. 🌟",
    date: "3 weeks ago",
  },
];

// Duplicate for seamless infinite loop
const ALL_REVIEWS = [...FAKE_REVIEWS, ...FAKE_REVIEWS];
const ROW1 = ALL_REVIEWS;
const ROW2 = [...ALL_REVIEWS].reverse();

function ReviewCard({ review }) {
  return (
    <div
      className="review-carousel-card flex-shrink-0 w-[300px] mx-3 rounded-2xl p-5 flex flex-col gap-y-3"
      style={{
        background: "linear-gradient(135deg, rgba(30,27,75,0.85) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(139,92,246,0.25)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-x-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover ring-2"
          style={{ ringColor: "rgba(139,92,246,0.5)" }}
          onError={(e) => {
            e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${review.name}`;
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{review.name}</p>
          <p className="text-purple-400 text-xs truncate">{review.course}</p>
        </div>
        <span className="text-gray-500 text-xs flex-shrink-0">{review.date}</span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-x-1">
        <ReactStars
          count={5}
          value={review.rating}
          size={16}
          isHalf={true}
          edit={false}
          activeColor="#facc15"
        />
        <span className="text-yellow-400 text-xs font-bold ml-1">{review.rating}</span>
      </div>

      {/* Review text */}
      <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
        "{review.review}"
      </p>
    </div>
  );
}

function MarqueeRow({ reviews, reverse = false, speed = 35 }) {
  const trackRef = useRef(null);

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          animation: `marquee-${reverse ? "reverse" : "forward"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {reviews.map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} review={review} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .review-carousel-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .review-carousel-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 40px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
          border-color: rgba(139,92,246,0.5) !important;
        }
      `}</style>
    </div>
  );
}

function FakeReviewsCarousel({ realReviews = [] }) {
  // Merge real reviews at the front, pad with fakes
  const merged = [
    ...realReviews.map((r) => ({
      id: r._id,
      name: `${r.user?.firstName || ""} ${r.user?.lastName || ""}`.trim() || "Student",
      avatar: r.user?.imgURL || `https://api.dicebear.com/9.x/initials/svg?seed=${r.user?.firstName}`,
      rating: r.rating,
      course: r.Course?.courseName || "StudyNotion Course",
      review: r.review,
      date: "Recently",
    })),
    ...FAKE_REVIEWS,
  ];

  const row1 = [...merged, ...merged];
  const row2 = [...merged].reverse();
  const row2Full = [...row2, ...row2];

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <MarqueeRow reviews={row1} reverse={false} speed={40} />
      <MarqueeRow reviews={row2Full} reverse={true} speed={36} />
    </div>
  );
}

export default FakeReviewsCarousel;
