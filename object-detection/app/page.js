import ObjectDetection from "@/components/object-detection";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h2 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl">
        Object Detection
      </h2>
      <ObjectDetection />
    </main>
  );
}
