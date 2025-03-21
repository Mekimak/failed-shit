import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import MessageList from "@/components/messaging/MessageList";
import { useAuth } from "@/contexts/AuthContext";

const MessagesPage = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-black">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
            Messages
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 mb-8">
            {profile?.user_type === "renter"
              ? "Communicate directly with landlords and property managers"
              : "Communicate directly with renters and applicants"}
          </p>

          <MessageList />
        </motion.div>
      </div>
    </div>
  );
};

export default MessagesPage;
