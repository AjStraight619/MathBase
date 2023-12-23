"use client";
import Contact from "@/components/about-interface/contact";
import SectionHeading from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start h-screen p-8">
      <motion.section
        className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
      >
        <SectionHeading>About Me</SectionHeading>

        <div className="flex items-center justify-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
            >
              <Image
                src={"/Portfolio-photo.jpg"}
                alt="Alex | Portfolio"
                width="192"
                height="192"
                quality="95"
                priority={true}
                className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
              />
            </motion.div>
          </div>
        </div>

        <motion.h1
          className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-bold">Hello, I'm Alex.</span> I'm an aspiring{" "}
          <span className="font-bold">full-stack developer</span> with{" "}
          <span className="font-bold">2 years</span> of experience. I am
          currently studying <span className="underline">Computer Science</span>{" "}
          at <span className="font-bold">San Diego State Univeristy</span> I
          enjoy building <span className="italic">web apps</span>. My focus is{" "}
          <span className="underline">React (Next.js)</span>.
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}
        >
          <Link
            href="#contact"
            className="group bg-gray-900  text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          >
            Contact me here{" "}
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>

          <a
            className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
            href="/Alex_Straight_Resume.pdf"
            download
          >
            Resume{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
          </a>
          <div className="flex flex-row gap-2">
            <a
              className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
              href="https://www.linkedin.com/in/alex-straight-997464272/"
              target="_blank"
            >
              <BsLinkedin />
            </a>

            <a
              className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border-black dark:bg-white/10 dark:text-white/60"
              href="https://github.com/AjStraight619?tab=repositories"
              target="_blank"
            >
              <FaGithubSquare />
            </a>
          </div>
        </motion.div>

        <p className="mb-3">
          My passion for{" "}
          <span className="font-medium">technology and solving problems</span>,
          led me to pursue a career in{" "}
          <span className="italic">Computer Science. </span>
          <span className="italic">My favorite part of programming</span> is the
          problem-solving aspect. I <span className="underline">love</span> the
          feeling of finally figuring out a solution to a problem. My core stack
          is{" "}
          <span className="font-medium">
            React, Next.js, Node.js, and MySQL
          </span>
          . I am also familiar with TypeScript and Prisma. I am always looking
          to learn new technologies. I am currently looking for a{" "}
          <span className="font-medium">full-time position or internship</span>
        </p>
        <p>
          <span className="italic">When I'm not coding</span>, I enjoy playing
          video games, watching TV shows, and going to the gym. I also enjoy{" "}
          <span className="font-medium">learning new things</span>. I am
          currently enhancing my skills in fine-tuning the GPT-3 Turbo model to
          improve its proficiency in solving mathematical problems, with the
          goal of integrating this advanced capability into this application.
        </p>
      </motion.section>
      <Contact />
    </div>
  );
}
