"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound } from "lucide-react";

const testimonials = [
  {
    name: "Jane Doe",
    title: "CTO",
    avatar: <UserRound />,
    company: "Facebook",
    description:
      "This tool has revolutionized our workflow. The AI capabilities are unmatched and have significantly boosted our productivity.",
  },
  {
    name: "John Smith",
    title: "COO",
    avatar: <UserRound />,
    company: "Amazon",
    description: "The best AI tool ever I have used. Very reliable",
  },
  {
    name: "Alice Johnson",
    title: "CFO",
    avatar: <UserRound />,
    company: "Google",
    description:
      "The financial forecasting features are top-notch. This tool has become an indispensable part of our financial planning.",
  },
  {
    name: "Bob Brown",
    title: "CMO",
    avatar: <UserRound />,
    company: "Microsoft",
    description: "The AI-driven analytics are a game-changer.",
  },
  {
    name: "Carol White",
    title: "CEO",
    avatar: <UserRound />,
    company: "Apple",
    description: " It's intuitive, powerful, and incredibly reliable.",
  },
  {
    name: "Leo Brown",
    title: "CEO",
    avatar: <UserRound />,
    company: "Microsoft",
    description:
      "Our marketing campaigns have never been more effective because of this ai tool.The financial forecasting features are top-notch. ",
  },
  {
    name: "David Green",
    title: "Head of AI",
    avatar: <UserRound />,
    company: "Netflix",
    description:
      "The AI integration has transformed our content recommendation system.",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className=" text-center text-4xl text-white font-bold mb-10 ">
        Testimonials
      </h2>
      <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.title}
            className=" bg-[#192339] border-none text-white
          "
          >
            <div className="flex px-6 pt-6">
              <div className="bg-slate-500  rounded-full p-2 ">
                {item.avatar}
              </div>
            </div>
            <CardHeader>
              <CardTitle className=" flex item  gap-x-2">
                <div>
                  <p className=" text-lg text-blue-400">{item.name}</p>
                  <p className=" text-sm text-zinc-500 ">
                    {item.title} / {item.company}
                  </p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
