"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/once-ui/components";

const NetworkBackground = dynamic(() => import("@/components/NetworkBackground"), {
  ssr: false,
  loading: () => <Skeleton shape="block" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }} />
});

export default function NetworkBackgroundWrapper() {
  return <NetworkBackground />;
}
