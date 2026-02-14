import { Fragment } from 'react';
import { InlineCode, RevealFx, Row, Line } from "@/once-ui/components";
import { Text } from "@/once-ui/components/Text";

const person = {
  firstName: "Shubham",
  lastName: "Umap",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "FullStack Web Developer",
  avatar: "/images/avatar.jpg", // Placeholder or keep existing if generic
  location: "Maharashtra, India",
  languages: ["English", "Hindi", "Marathi"],
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Shubhamvumap123",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/shubhamvumap123", // Best guess or placeholder
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:shubhamvumap@gmail.com",
  },
  {
    name: "Portfolio",
    icon: "globe", // Using globe as generic for portfolio website if specific icon not available, or keep generic
    link: "https://shubham-umap.netlify.app",
  },
];

const home = {
  label: "Home",
  title: `${person.name} - FullStack MERN Developer`,
  description: `Portfolio of ${person.name}, a FullStack Web Developer specialized in React.js, Node.js, and MongoDB.`,
  headline: (
    <>
      Building scalable and user-centric web applications
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured Project</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Bobbi Brown Clone
        </Text>
      </Row>
    ),
    href: "/work/bobbi-brown-clone",
  },
  subline: (
    <>
      👋 Hi! I&apos;m Shubham Umap, a FullStack Web Developer with expertise in React.js, Node.js, and the MERN stack. I specialize in creating intuitive interfaces, optimizing API performance, and implementing secure authentication systems.
    </>
  ),
};

// About Page
const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  path: "/about",
  tableOfContent: { display: true, subItems: true },
  avatar: { display: true },
  calendar: { display: true, link: "mailto:shubhamvumap@gmail.com" },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        React.js, Node.js and MERN stack development with 2+ years of experience in developing efficient, user-focused web applications. Skilled in React, Redux, Node.js, Express, and MongoDB, with a strong background in creating intuitive interfaces, optimizing API performance, and implementing secure authentication systems. Experienced in Agile workflows and team collaboration to deliver reliable software solutions within deadlines.
        <br /><br />
        <a href="https://drive.google.com/file/d/1eMneL-yNNYksqCdp5Vsm_Q7jFrpimrSW/view?usp=sharing" download="Shubham_Umap_Resume.pdf" target="_blank" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Download My Resume</a>
      </>
    ),
  },

  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Tridiagonal Software",
        timeframe: "Sep 2025 - Present",
        role: "Software Engineer-1",
        achievements: [
          <Fragment key="se1-ach-1">
            <strong>Architected 3D-to-UI Synchronization:</strong> Revamped complex React forms for scientific visualization modules, eliminating critical state desynchronization between user inputs and interactive 3D rendering windows.
          </Fragment>,
          <Fragment key="se1-ach-2">
            <strong>Enforced Data Integrity:</strong> Devised strict validation logic for high-precision engineering tools (Histogram, Pathlines), preventing invalid data ranges and ensuring 100% simulation accuracy.
          </Fragment>,
          <Fragment key="se1-ach-3">
            <strong>Streamlined Defect Resolution:</strong> Led cross-functional troubleshooting sessions with QA and Backend teams to resolve persistent state retention bugs in Pipeline Trees, reducing ticket resolution time by 40%.
          </Fragment>,
        ],
        images: [],
      },
      {
        company: "Independent Software Engineer",
        timeframe: "Jan 2025 - Aug 2025",
        role: "",
        achievements: [
          <Fragment key="freelance-ach-3">
            <strong>Engineered Interactive Game Logic:</strong> Developed an object-oriented 2D browser game using HTML5 Canvas, implementing custom algorithms for collision detection and rendering optimization.
          </Fragment>,
          <Fragment key="freelance-ach-4">
            <strong>Implemented Persistence Strategies:</strong> Leveraged Local Storage solutions for a Task Manager application to maintain user session data without backend dependencies.
          </Fragment>,
          <Fragment key="freelance-ach-1">
            <strong>Built Scalable E-Commerce Architecture:</strong> Developed a React.js product platform utilizing Redux Toolkit for global state management to mirror enterprise-grade performance.
          </Fragment>,
          <Fragment key="freelance-ach-2">
            <strong>Deployed Real-Time Dashboards:</strong> Integrated external RESTful APIs (Weather Data) using Asynchronous JavaScript and React Error Boundaries to handle complex data fetching.
          </Fragment>,

        ],
        images: [],
      },
      {
        company: "NCircletech Pvt. Ltd.",
        timeframe: "Feb 2023 - Dec 2024",
        role: "MERN Stack Developer",
        achievements: [
          <Fragment key="ach-1">
            <strong>Project Management Tool:</strong> Designed and implemented a project management platform adopted by 50+ teams, increasing productivity by 30% through streamlined workflows and automated task tracking.
          </Fragment>,
          <Fragment key="ach-2">
            Optimized user engagement strategies, achieving a 25% increase in interaction rates by analyzing behavioral data and refining UX designs.
          </Fragment>,
          <Fragment key="ach-3">
            Engineered scalable server-side solutions with Node.js and Express.js, processing 10,000+ client requests daily with 99.9% uptime and a 40% reduction in response times.
          </Fragment>,
          <Fragment key="ach-4">
            <strong>NBIM Project:</strong> Modernized the user interface, resulting in a 40% rise in engagement through intuitive interaction designs and enhanced usability.
          </Fragment>,
          <Fragment key="ach-5">
            Integrated Forge Viewer and Cesium Viewer, enabling 3D visualization of CAD and geospatial data, improving accessibility for 500+ datasets.
          </Fragment>,
          <Fragment key="ach-6">
            Developed customizable archive features, reducing user navigation time by 25% and increasing operational efficiency by 20%.
          </Fragment>,
          <Fragment key="ach-7">
            <strong>Siemens Web Framework (SWF):</strong> Delivered 15+ reusable components and resolved 30+ high-priority defects, boosting development efficiency by 30%.
          </Fragment>,
          <Fragment key="ach-8">
            Consolidated 500,000+ records into a unified data integration system, enhancing accuracy and accessibility for 20+ stakeholders.
          </Fragment>,
          <Fragment key="ach-9">
            Automated testing workflows with Storybook, reducing manual QA efforts by 50% and increasing defect detection rates by 20%.
          </Fragment>,
        ],
        images: [],
      },
      {
        company: "Applore Technology",
        timeframe: "Aug 2022 - Nov 2022",
        role: "MERN stack Developer internship",
        achievements: [
          <Fragment key="ach-1">
            Optimized system performance by 30% through refactoring legacy code and fine-tuning database queries.
          </Fragment>,
          <Fragment key="ach-2">
            Eliminated 15% of bugs and enhanced reliability through thorough codebase refactoring.
          </Fragment>,
          <Fragment key="ach-3">
            Diagnosed and rectified 50+ issues while introducing 5 new features, ensuring on-time delivery and improving user engagement.
          </Fragment>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: 'Masai School',
        description: <>MERN Stack Developer Training (Oct 2021 - Aug 2022). Secured a position within the top three projects out of over 20 contenders.</>,
      },
      {
        name: 'Gurunanak Institute of technology',
        description: <>Mechanical Engineering (June 2014 - June 2018). CGPA: 8.06</>,
      },

    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "JavaScript",
        description: <>ES6+, Async/Await, DOM Manipulation</>,
        images: [],
        icon: "javascript",
      },
      {
        title: "TypeScript",
        description: <>Static Typing, Interfaces, Generics</>,
        images: [],
        icon: "typescript",
      },
      {
        title: "React.js",
        description: <>Hooks, Context API, Redux</>,
        images: [],
        icon: "react",
      },
      {
        title: "Node.js",
        description: <>Event Loop, Streams, File System</>,
        images: [],
        icon: "node",
      },
      {
        title: "Express.js",
        description: <>Middleware, Routing, REST API</>,
        images: [],
        icon: "express",
      },
      {
        title: "MongoDB",
        description: <>Aggregation, Schema Design, Mongoose</>,
        images: [],
        icon: "mongodb",
      },
      {
        title: "HTML/CSS",
        description: <>Semantic HTML, Flexbox, Grid, Responsive Design</>,
        images: [],
        icon: "html",
      },
      {
        title: "Tailwind CSS",
        description: <>Utility-first CSS, Custom Configuration</>,
        images: [],
        icon: "tailwind",
      },
      {
        title: "Three.js",
        description: <>3D Rendering, Shaders</>,
        images: [],
        icon: "threejs",
      },
      {
        title: "Git/GitHub",
        description: <>Version Control, Branching, Merging</>,
        images: [],
        icon: "github",
      },
    ],
  },
};

// Technical Page
const technical = {
  label: "Technical",
  title: "Technical Architecture",
  description: `Technical designs and architecture by ${person.name}`,
  path: "/technical",
};

// Work page
const work = {
  label: "Work",
  title: "Projects",
  description: `Engineering projects by ${person.name}`,
  path: "/work",
};

// Gallery Page
const gallery = {
  label: "Gallery",
  title: "Gallery",
  description: `A photo collection by ${person.name}`,
  path: "/gallery",
  images: [
    // Keeping minimal gallery or placeholder to avoid breaking if images missing
    { src: "/images/gallery/img-01.avif", alt: "image", orientation: "vertical" },
  ],
};

// Blog Page
const blog = {
  label: "Blog",
  title: "Blog",
  description: `Read technical blog posts by ${person.name}`,
  path: "/blog",
};

// Newsletter
const newsletter = {
  display: true,
  title: "Let's Connect",
  description: "I'm currently looking for new opportunities. Feel free to reach out if you'd like to collaborate or have a chat about technology.",
  action: "mailto:shubhamvumap@gmail.com",
};


// Technical Modules (New)
const technicalModules = [
  {
    title: "3D_VISUALIZATION",
    description: "Integration of Forge & Cesium Viewers for CAD/Geospatial data.",
    tech: ["Three.js", "WebGL", "React"],
    status: "ONLINE",
    icon: "cube", // Use a relevant icon name
    details: [
      "Integrated Forge Viewer and Cesium Viewer to enable 3D visualization of CAD and geospatial data.",
      "Improved accessibility for 500+ datasets through optimized rendering pipelines.",
      "Implemented camera controls and scene manipulation for enhanced user interaction."
    ]
  },
  {
    title: "PHYSICS_ENGINE",
    description: "Custom collision detection & rendering algorithms for 2D gaming.",
    tech: ["Canvas API", "Algorithms", "HTML5"],
    status: "ACTIVE",
    icon: "gamepad",
    details: [
      "Engineered an object-oriented 2D browser game using HTML5 Canvas without external physics libraries.",
      "Developed custom algorithms for efficient collision detection and response.",
      "Optimized rendering loops to maintain 60FPS performance across devices."
    ]
  },
  {
    title: "STATE_SYNCHRONIZER",
    description: "Complex 3D-to-UI state management ensuring 100% simulation accuracy.",
    tech: ["Redux", "React", "State Machines"],
    status: "OPTIMAL",
    icon: "refresh",
    details: [
      "Architected 3D-to-UI synchronization to eliminate critical state desynchronization.",
      "Revamped complex React forms for scientific visualization modules.",
      "Enforced strict data integrity validation for high-precision engineering tools."
    ]
  },
  {
    title: "DATA_BANK_CORE",
    description: "Scalable NoSQL storage with flexible schema design for rapid iteration.",
    tech: ["MongoDB", "Mongoose", "Aggregation"],
    status: "SECURE",
    icon: "database",
    details: [
      "Consolidated 500,000+ records into a unified data integration system.",
      "Designed and implemented scalable server-side solutions processing 10,000+ daily requests.",
      "Optimized database queries to achieve a 40% reduction in response times."
    ]
  },
];

export { person, social, home, about, work, gallery, technical, technicalModules, blog, newsletter };
