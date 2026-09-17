export const initialCurrentUser = {
  id: "usr_fresher_01",
  name: "Alex Rivera",
  headline: "Aspiring Full Stack Developer | 2025 CS Graduate",
  location: "Bangalore, India",
  college: "National Institute of Technology",
  degree: "B.Tech in Computer Science & Engineering (2021 - 2025)",
  gpa: "8.7 / 10",
  bio: "Passionate about building responsive web applications, REST APIs, and scalable software solutions. Eager to solve real-world engineering problems in an entry-level SDE role.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  isOpenToWork: true,
  matchScoreOverall: 92,
  profileViews: 148,
  searchAppearances: 64,
  postImpressions: 1240,
  skills: [
    { name: "React.js", rating: 90, verified: true, level: "Advanced" },
    { name: "JavaScript (ES6+)", rating: 92, verified: true, level: "Advanced" },
    { name: "Node.js & Express", rating: 82, verified: true, level: "Intermediate" },
    { name: "Python", rating: 85, verified: true, level: "Intermediate" },
    { name: "SQL / PostgreSQL", rating: 78, verified: false, level: "Intermediate" },
    { name: "HTML5 & CSS3", rating: 95, verified: true, level: "Advanced" },
    { name: "Git & GitHub", rating: 88, verified: true, level: "Intermediate" },
    { name: "Data Structures & Algorithms", rating: 80, verified: true, level: "Intermediate" }
  ],
  projects: [
    {
      id: "p1",
      title: "DevConnect - Developer Networking App",
      description: "Full-stack web application featuring user authentication, real-time messaging, post interactions, and markdown project portfolios.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/alexrivera/devconnect",
      liveDemo: "https://devconnect-demo.vercel.app",
      stars: 42
    },
    {
      id: "p2",
      title: "AI Resume Matcher & Optimizer",
      description: "Natural language processing web tool that parses resume PDFs, calculates ATS compatibility score against job descriptions, and outputs missing keywords.",
      techStack: ["Python", "FastAPI", "SpaCy", "React"],
      githubUrl: "https://github.com/alexrivera/ai-resume-matcher",
      liveDemo: "https://ai-resume-optimizer.vercel.app",
      stars: 68
    },
    {
      id: "p3",
      title: "TaskPulse - Collaborative Kanban Dashboard",
      description: "Interactive drag-and-drop task management tool with drag animations, sub-task tracking, and dark mode customization.",
      techStack: ["React", "TailwindCSS", "Zustand"],
      githubUrl: "https://github.com/alexrivera/taskpulse",
      liveDemo: "https://taskpulse.vercel.app",
      stars: 29
    }
  ],
  certifications: [
    { title: "Meta Front-End Developer Professional Certificate", issuer: "Coursera", year: "2024", badge: "Verified Professional" },
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", badge: "Cloud Certified" },
    { title: "Problem Solving (Intermediate) Certificate", issuer: "HackerRank", year: "2024", badge: "Gold Level" }
  ]
};

export const initialJobs = [
  {
    id: "job_01",
    title: "Junior Frontend Developer (React)",
    company: "TechCorp Global",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
    location: "Bangalore, India",
    workMode: "Hybrid",
    experience: "Freshers / 0-1 Year",
    salary: "₹6.5 LPA - ₹8.5 LPA",
    postedDate: "2 hours ago",
    applicantsCount: 28,
    matchScore: 96,
    batchTarget: "2024 & 2025 Graduates",
    badges: ["Campus Hire Friendly", "Training Provided", "Quick Apply"],
    description: "We are seeking an enthusiastic Junior Frontend Developer to join our core product team. You will build user-facing components, collaborate with senior UI/UX designers, and optimize web app performance.",
    requirements: [
      "Proficiency in React.js, JavaScript (ES6+), HTML5, and CSS3",
      "Understanding of REST APIs and async state management",
      "Familiarity with Git/GitHub version control",
      "Good problem-solving skills and eager to learn new technologies"
    ],
    perks: ["Health Insurance", "Annual Learning Stipend (₹30k)", "Flexible Hours", "Mentorship Program"],
    recruiter: {
      name: "Priya Sharma",
      title: "Technical Talent Acquisition @ TechCorp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "job_02",
    title: "Graduate Engineering Trainee (GET) - Software",
    company: "Nexus Cloud Systems",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80",
    location: "Hyderabad, India",
    workMode: "On-site",
    experience: "0 Years (Freshers Only)",
    salary: "₹7.0 LPA - ₹9.5 LPA",
    postedDate: "5 hours ago",
    applicantsCount: 64,
    matchScore: 91,
    batchTarget: "2025 Passouts",
    badges: ["0 Exp Required", "Rotational Program", "Immediate Hiring"],
    description: "Nexus Cloud Systems is conducting a campus & off-campus hiring drive for Graduate Engineering Trainees. Selected candidates will complete a 3-month paid boot camp before joining engineering streams.",
    requirements: [
      "B.Tech / B.E / M.Tech in CS, IT, ECE or related streams",
      "Strong foundation in Data Structures, Algorithms, and OOP concepts",
      "Hands-on project experience in Python, Java, or C++",
      "Minimum 60% or 6.5 CGPA throughout academics"
    ],
    perks: ["Relocation Allowance", "Cab Facility", "Free Lunch & Snacks", "Performance Bonus"],
    recruiter: {
      name: "Rohan Varma",
      title: "Lead Campus Recruiter @ Nexus Cloud",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "job_03",
    title: "Associate Data Analyst Intern / Fresher",
    company: "DataMetrics Analytics",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80",
    location: "Remote (India)",
    workMode: "Remote",
    experience: "Internship / 0-1 Year",
    salary: "₹35,000 / month (PPO up to 6.5 LPA)",
    postedDate: "1 day ago",
    applicantsCount: 42,
    matchScore: 88,
    batchTarget: "2024, 2025, 2026 Batch",
    badges: ["Remote Work", "Pre-Placement Offer", "Mentorship"],
    description: "Looking for detail-oriented freshers who love data visualization, SQL queries, and Python scripting to generate actionable business insights.",
    requirements: [
      "Good knowledge of SQL (joins, aggregations, CTEs)",
      "Basics of Python (Pandas, NumPy) or R",
      "Experience creating dashboards in PowerBI, Tableau, or Metabase is a plus"
    ],
    perks: ["100% Remote", "Equipment Provided", "Flexible Work Timings"],
    recruiter: {
      name: "Ananya Roy",
      title: "HR Business Partner @ DataMetrics",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "job_04",
    title: "Associate Software Engineer (Backend - Java / Node)",
    company: "FinTech Wave Solutions",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80",
    location: "Pune, India",
    workMode: "Hybrid",
    experience: "0-1 Year",
    salary: "₹8.0 LPA - ₹11.0 LPA",
    postedDate: "2 days ago",
    applicantsCount: 89,
    matchScore: 84,
    batchTarget: "2024 & 2025 Graduates",
    badges: ["High Growth", "Fintech Industry", "Skill Based Hiring"],
    description: "FinTech Wave is expanding its backend microservices team. We value solid fundamentals and enthusiasm over years of experience.",
    requirements: [
      "Strong understanding of RESTful APIs, HTTP protocols, and database schema design",
      "Hands-on project work in Node.js, Spring Boot, or Go",
      "Understanding of Git workflow and unit testing basics"
    ],
    perks: ["Comprehensive Medical Insurance", "Stock Options (ESOPs)", "Wellness Allowance"],
    recruiter: {
      name: "David Chen",
      title: "Senior Engineering Hiring Manager",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "job_05",
    title: "Junior UI/UX & Web Designer",
    company: "PixelCraft Studios",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80",
    location: "Remote",
    workMode: "Remote",
    experience: "Freshers Welcome",
    salary: "₹5.0 LPA - ₹7.0 LPA",
    postedDate: "3 days ago",
    applicantsCount: 31,
    matchScore: 78,
    batchTarget: "Any Graduate",
    badges: ["Portfolio Required", "Creative Environment", "Remote"],
    description: "Craft visually intuitive web experiences, UI wireframes, and design components. Portfolio with design projects or Figma links is mandatory.",
    requirements: [
      "Proficiency in Figma or Adobe XD",
      "Understanding of responsive design principles and design tokens",
      "Basic HTML/CSS knowledge to collaborate effectively with frontend developers"
    ],
    perks: ["MacBook Provided", "Creative Freedom", "Team Retreats"],
    recruiter: {
      name: "Siddharth Nair",
      title: "Design Director @ PixelCraft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  }
];

export const initialPosts = [
  {
    id: "post_01",
    author: {
      name: "Priya Sharma",
      headline: "Technical Talent Acquisition @ TechCorp Global",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    category: "Hiring Alert",
    timestamp: "3 hours ago",
    content: "📢 **FRESHER HIRING ALERT!** \n\nWe are opening 25+ Junior Frontend & Full-Stack Engineer roles at TechCorp Global for the 2024 & 2025 batches! 🚀\n\nWhat we look for:\n✅ Solid JavaScript / React or Node.js fundamentals\n✅ Passionate college project work (GitHub links welcome!)\n✅ Eagerness to learn in a high-growth environment\n\nNo 5-year experience requirement here—if you can write clean code and explain your logic, apply directly on Job Opportunity Hub! 💼✨",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    likes: 184,
    comments: [
      { id: "c1", author: "Alex Rivera", text: "Just applied! Excited for this opportunity. My portfolio showcases a full-stack e-commerce app and AI resume tool.", timestamp: "2 hours ago" },
      { id: "c2", author: "Rahul Verma", text: "Are 2026 passouts eligible for internships?", timestamp: "1 hour ago" }
    ],
    reposts: 38,
    isLiked: false
  },
  {
    id: "post_02",
    author: {
      name: "Alex Rivera",
      headline: "Aspiring Full Stack Developer | 2025 CS Graduate",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      verified: false
    },
    category: "Project Showcase",
    timestamp: "1 day ago",
    content: "🎉 Exciting News! I just completed my capstone project: **AI-Powered Resume Matcher & ATS Optimizer** 🤖\n\nBuilt with React, FastAPI (Python), and SpaCy NLP. It parses resume text and compares it against job descriptions to provide an instant ATS match score and keyword gap analysis!\n\nCheck out the live demo link on my profile! Feedback from senior engineers and recruiters would mean the world to me. 🙏",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    likes: 92,
    comments: [
      { id: "c3", author: "David Chen", text: "Super impressive work for a fresher! Loved the clean UI. Sending you a connection request.", timestamp: "18 hours ago" }
    ],
    reposts: 14,
    isLiked: true
  },
  {
    id: "post_03",
    author: {
      name: "Vikram Malhotra",
      headline: "Staff Engineer & Career Mentor @ Google",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    category: "Interview Tips",
    timestamp: "2 days ago",
    content: "💡 **3 Golden Rules for Freshers Cracking Coding Interviews in 2025:**\n\n1️⃣ **Master Communication over Perfection**: Think out loud during problem-solving. Interviewers want to hear your thought process, not just code.\n2️⃣ **Understand standard Data Structures**: Arrays, Trees, HashMaps, and Graphs account for 80% of entry-level questions.\n3️⃣ **Clean Code Matters**: Name variables clearly (`userList` vs `x`).\n\nKeep pushing, freshers! Your first offer is right around the corner. 💪",
    likes: 412,
    comments: [],
    reposts: 89,
    isLiked: false
  }
];

export const mockNetwork = [
  {
    id: "net_01",
    name: "Siddharth Verma",
    role: "Senior Recruiter @ Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    mutualConnections: 18,
    isRecruiter: true,
    hiringFor: ["Graduate Software Engineer", "Data Engineer Trainee"]
  },
  {
    id: "net_02",
    name: "Kavya Deshmukh",
    role: "Software Engineer II @ Amazon | NIT Alumni",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    mutualConnections: 24,
    isMentor: true,
    offersReferrals: true
  },
  {
    id: "net_03",
    name: "Arjun Mehta",
    role: "Campus Relations Lead @ Zoho",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    mutualConnections: 12,
    isRecruiter: true,
    hiringFor: ["Off-Campus Fresher Drive 2025"]
  },
  {
    id: "net_04",
    name: "Neha Gupta",
    role: "Frontend Tech Lead @ Freshworks",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    mutualConnections: 31,
    isMentor: true,
    offersMockInterviews: true
  }
];

export const mockApplicationTracker = [
  {
    id: "app_101",
    jobTitle: "Junior Frontend Developer",
    company: "TechCorp Global",
    appliedDate: "2026-09-10",
    status: "Interviewing",
    nextStep: "Technical Round scheduled for Sept 15, 2:00 PM",
    matchScore: 96,
    notes: "Reviewed React hooks & Virtual DOM concepts."
  },
  {
    id: "app_102",
    jobTitle: "Graduate Engineering Trainee",
    company: "Nexus Cloud Systems",
    appliedDate: "2026-09-11",
    status: "Screening",
    nextStep: "Online Aptitude Test submitted",
    matchScore: 91,
    notes: "Aptitude score 92/100."
  },
  {
    id: "app_103",
    jobTitle: "Associate Data Analyst Intern",
    company: "DataMetrics Analytics",
    appliedDate: "2026-09-08",
    status: "Applied",
    nextStep: "Awaiting recruiter response",
    matchScore: 88,
    notes: "Submitted custom cover letter emphasizing SQL skills."
  }
];
