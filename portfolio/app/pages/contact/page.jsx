"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Computer, Loader2, CheckCircle} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(()=> {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
  }, []);

  const social_links = {
    github: {
      url: "https://github.com/walletkun",
      label: "@walletkun",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/fei-lincs/",
      label: "@fei-lincs",
    },
    email: {
      url: "mailto: feilinpersonal@gmail.com",
      label: "feilinpersonal@gmail.com",
    },
    devpost: {
      url: "https://devpost.com/walletkun",
      label: "Fei Lin (walletkun)",
    },
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);

      toast({
        variant: "default",
        title: "Success!",
        description: "Your message has been sent. I'll get back to you soon!",
        duration: 5000,
      });

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Contact
          </h1>
          <p className="text-xl font-sans text-gray-600 dark:text-gray-300">
            Thank you for reaching out! Feel free to contact me using the form
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="md:col-span-2 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block text-green-500 mb-4 font-sans"
                  >
                    <CheckCircle className="w-16 h-16 font-sans" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold mb-2 font-sans"
                  >
                    Message Sent!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 dark:text-gray-300 font-sans"
                  >
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <Card className="md:col-span-2 bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                    <div>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="bg-gray-50 dark:bg-gray-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="bg-gray-50 dark:bg-gray-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        className="min-h-[200px] bg-gray-50 dark:bg-gray-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center md:items-start space-y-6">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Connect With Me
            </h2>
            <div className="flex flex-col space-y-4 w-full">
              {Object.entries(social_links).map(([key, data]) => (
                <Link
                  key={key}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-sans space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full group-hover:bg-gray-300 dark:group-hover:bg-gray-500 transition-colors">
                    {key === "github" && <Github className="h-5 w-5" />}
                    {key === "linkedin" && <Linkedin className="h-5 w-5" />}
                    {key === "email" && <Mail className="h-5 w-5" />}
                    {key === "devpost" && <Computer className="h-5 w-5" />}
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {data.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
