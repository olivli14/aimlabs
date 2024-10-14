"use client";
import React, { useState, useEffect } from "react";
import RandomButton from "./elements/randomButton";
import MoreButton from "./elements/moreButton";
import LessButton from "./elements/lessButton";
import RoundsTimer from './elements/inputTime';



import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

//export const description = "A linear area chart"

const chartConfig = {
  desktop: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export default function Home() {
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [clicksPerRound, setClicksPerRound] = useState<number[]>([]);
  const [chartData, setChartData] = useState<{ round: string, clicks: number} []>([]);
  const [numButtons, setNumButtons] = useState(5);
  //start with five buttons bc usually in val or csgo the enemy team is 5
  const [buttons, setButtons] = useState<number[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  

  const incrementTotalClicks = () => {
    setTotalClicks(totalClicks + 1); // Increment total click count
  };

  useEffect(() => {
    // Create an array of button IDs based on the number of buttons
    const buttonArray = Array.from({ length: numButtons }, (_, index) => index);
    setButtons(buttonArray); // Populate the button array
  }, [numButtons]); // Re-run when numButtons changes

  const handleMoreButtonClick = () => {
    setNumButtons((prev) => prev + 1); // Increase the number of buttons by 1
  };
  const handleLessButtonClick = () => {
    setNumButtons((prev) => prev - 1); // Increase the number of buttons by 1
  };

  // This function is called when a round is complete
  const handleRoundComplete = () => {
    // Add the current totalClicks to the clicksPerRound array
    setClicksPerRound((prev) => [...prev, totalClicks]);

    //update chart data with new round and clicks
    setChartData((prevData) => [
      ...prevData,
      { round: `Round ${prevData.length + 1}`, clicks: totalClicks },
    ]);

    // Reset the totalClicks for the new round
    setTotalClicks(0);
  };

  

  return (
    <div className="flex flex-col">
      <Card >
        <CardHeader>
          <CardTitle>Aim Train</CardTitle>
        </CardHeader>
        
      </Card> 
      <div>
        <RoundsTimer onRoundComplete={handleRoundComplete}/>
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
            <CardDescription>
              Total clicks per round
            </CardDescription>
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
                <XAxis
                  dataKey="round"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
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

          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Round 1 - Round {chartData.length}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
          

      </div>
      
    </div>
    
  );
}