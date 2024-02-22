"use client";

import { motion } from "framer-motion";

export default function FadeIn(props: any) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: props.y || 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: props.transition || 0.5 }}
      {...props}
    />
  );
}
