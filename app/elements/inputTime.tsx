import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RoundsTimerProps{
    onRoundComplete: (currentRound: number) => void; //Function called when a round completes, helps track total clicks per round
}

const RoundsTimer: React.FC<RoundsTimerProps> = ({ onRoundComplete }) => {
  const [rounds, setRounds] = useState<string>(""); // Number of rounds
  const [seconds, setSeconds] = useState<string>(""); // Seconds per round
  const [currentRound, setCurrentRound] = useState<number>(0); // Track the current round, start with zero
  const [timeLeft, setTimeLeft] = useState<number>(0); // Track time left in the current round, start with zero
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false); // Flag for active timer

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && currentRound < Number(rounds)) {
      if (timeLeft > 0) {
        // Countdown the timeLeft each second
        timer = setTimeout(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else if (timeLeft === 0 && currentRound < Number(rounds) - 1) {
        onRoundComplete(currentRound);
        // If time is up, move to the next round
        setCurrentRound((prev) => prev + 1);
        setTimeLeft(Number(seconds)); // Reset the time for the next round
      } else if (timeLeft === 0 && currentRound === Number(rounds) - 1) {
        // If it's the last round and time is up, stop the timer
        onRoundComplete(currentRound);
        setIsTimerActive(false);
        //window.location.reload();
        alert("All rounds complete!");
      }
    }

    return () => clearTimeout(timer); // Cleanup the timer on unmount or timeLeft change
  }, [isTimerActive, timeLeft, currentRound, rounds, seconds]);

  const handleStart = () => {
    if (Number(rounds) > 0 && Number(seconds) > 0) {
      setCurrentRound(0); // Reset current round
      setTimeLeft(Number(seconds)); // Set time for the first round
      setIsTimerActive(true); // Start the timer
    }
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <div className="flex flex-row space-x-2">
        <Input
          type="number"
          placeholder="Number of Rounds"
          value={rounds}
          onChange={(e) => setRounds(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Seconds per Round"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
        <Button
          onClick={handleStart}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Start
        </Button>
      </div>
      <div className="mt-4">
        {isTimerActive && (
          <h2 className="text-lg">
            Round {currentRound + 1} of {rounds} - Time Left: {timeLeft} seconds
          </h2>
        )}
      </div>
    </div>
  );
};

export default RoundsTimer;
