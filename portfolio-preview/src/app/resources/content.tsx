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
        <a href="https://drive.google.com/file/d/17BzDRefQxIOH506jKVyJBYYGKZrhvwGr/view?usp=sharing" download="Shubham_Umap_Resume.pdf" target="_blank" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Download My Resume</a>
      </>
    ),
  },

  work: {
    display: true,
    title: "Work Experience",
    experiences: [
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
        name: 'Gurunanak Institute of technology',
        description: <>Mechanical Engineering (June 2014 - June 2018). CGPA: 8.06</>,
      },
      {
        name: 'Masai School',
        description: <>MERN Stack Developer Training (Oct 2021 - Aug 2022). Secured a position within the top three projects out of over 20 contenders.</>,
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

// Publications Page
const publications = {
  label: "Publications",
  title: "Publications",
  description: `Publications by ${person.name} `,
  path: "/publications",
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
// Newsletter
const newsletter = {
  display: true,
  title: "Let's Connect",
  description: "I'm currently looking for new opportunities. Feel free to reach out if you'd like to collaborate or have a chat about technology.",
  action: "mailto:shubhamvumap@gmail.com",
};

export { person, social, home, about, work, gallery, publications, blog, newsletter };
