"use client";
import React, { useState, useEffect } from "react";
import RandomButton from "./elements/randomButton";
import MoreButton from "./elements/moreButton";
import LessButton from "./elements/lessButton";
import RoundsTimer from "./elements/inputTime";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  highScore: z
    .number({
      required_error: "High score is required",
      invalid_type_error: "High score must be a number",
    })
    .positive("High score must be greater than 0")
    .int("High score must be an integer"),
});

const chartConfig = {
  desktop: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Home() {
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [clicksPerRound, setClicksPerRound] = useState<number[]>([]);
  const [chartData, setChartData] = useState<{ round: string; clicks: number }[]>(
    []
  );
  const [numButtons, setNumButtons] = useState(5);
  const [buttons, setButtons] = useState<number[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      highScore: 0,
    },
  });

  // Submit handler for form
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    alert(`High score submitted: ${values.highScore}`);
  };

  const incrementTotalClicks = () => {
    setTotalClicks(totalClicks + 1); // Increment total click count
  };

  useEffect(() => {
    const buttonArray = Array.from({ length: numButtons }, (_, index) => index);
    setButtons(buttonArray); // Populate the button array
  }, [numButtons]);

  const handleMoreButtonClick = () => {
    setNumButtons((prev) => prev + 1); // Increase the number of buttons by 1
  };
  const handleLessButtonClick = () => {
    setNumButtons((prev) => prev - 1); // Decrease the number of buttons by 1
  };

  const handleRoundComplete = () => {
    setClicksPerRound((prev) => [...prev, totalClicks]);

    setChartData((prevData) => [
      ...prevData,
      { round: `Round ${prevData.length + 1}`, clicks: totalClicks },
    ]);

    setTotalClicks(0);
  };

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Aim Train</CardTitle>
        </CardHeader>
      </Card>

      <div>
        <RoundsTimer onRoundComplete={handleRoundComplete} />
      </div>

      <div className="bg-[#d3eaed] my-3 mr-3 ml-3 rounded-md">
        <div
          ref={containerRef}
          className="relative w-full h-[500px] bg-[#16274f]-100 mr-3 ml-3 mt-3 mb-3"
        >
          {buttons.map((buttonId) => (
            <RandomButton
              key={buttonId}
              id={buttonId}
              onIncrement={incrementTotalClicks}
            />
          ))}
        </div>
        <Card className="bg-[#d3eaed] border=[#d3eaed]">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="relative mt-7">
        <div className="relative justify-center items-center space-x-8 mt-5 bg-[#d3eaed]">
          <MoreButton onClick={handleMoreButtonClick} />
          <LessButton onClick={handleLessButtonClick} />
        </div>
      </div>

      <div className="mt-4 mb-4 ml-4 mr-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
            <CardDescription>Total clicks per round</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="round" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="clicks"
                  type="linear"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* User High Score Submission Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>This will be your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="highScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>High Score</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your high score"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter a valid high score (integer greater than 0).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500">
            Submit High Score
          </Button>
        </form>
      </Form>
    </div>
  );
}
