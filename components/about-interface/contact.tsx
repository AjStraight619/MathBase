"use client";
import { sendEmail } from "@/actions/sendEmail";
import { motion } from "framer-motion";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SectionHeading from "../ui/section-heading";
import { Textarea } from "../ui/textarea";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <motion.section
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center pt-20 pb-10"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-primary -mt-6 dark:text-primary/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:AlexStraight619@gmail.com">
          AlexStraight619@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        ref={formRef}
        className="mt-10 flex flex-col"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
          formRef.current?.reset();
        }}
      >
        <Input
          className="h-14 px-4 rounded-lg  dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none dark:text-black"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <Textarea
          className="h-52 my-3 rounded-lg  p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none dark:text-black"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />

        <Button
          className="group flex items-center justify-center gap-2 h-[3rem] w-[4.5rem] rounded-2xl outline-none transition-all focus:scale-110 hover:scale-110  active:scale-105  disabled:scale-100 disabled:bg-opacity-65"
          type="submit"
        >
          Send
          <span>
            <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </Button>
      </form>
    </motion.section>
  );
}
