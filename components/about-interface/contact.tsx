"use client";

import { sendEmail } from "@/actions/sendEmail";

import EmailSubmitButton from "@/email/email-submit-button";
import { motion } from "framer-motion";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import SectionHeading from "../ui/section-heading";
import { Textarea } from "../ui/textarea";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <motion.section
      id="contact"
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

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:astraight9409@sdsu.edu">
          astraight9409@sdsu.edu
        </a>{" "}
        or through this form.
      </p>

      <form
        ref={formRef}
        className="mt-10 flex flex-col text-primary"
        action={async (formData) => {
          const { data, error, success } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          if (success) {
            toast.success("Email sent successfully!");
            formRef.current?.reset();
          }
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
        <EmailSubmitButton />
      </form>
    </motion.section>
  );
}
