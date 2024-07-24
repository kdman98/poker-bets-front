import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./App.css";

export default function Component() {
    const [numPlayers, setNumPlayers] = useState(6);
    const [boardCards, setBoardCards] = useState(["", "", "", "", ""]);
    const [holeCards, setHoleCards] = useState(["", ""]);
    const [playerActions, setPlayerActions] = useState(
        Array(numPlayers).fill({ action: "fold", bet: 0 })
    );

    const handleNumPlayersChange = (value) => {
        setNumPlayers(value);
        setPlayerActions(Array(value).fill({ action: "fold", bet: 0 }));
    };

    const handleBoardCardChange = (index, value) => {
        const newBoardCards = [...boardCards];
        newBoardCards[index] = value;
        setBoardCards(newBoardCards);
    };

    const handleHoleCardChange = (index, value) => {
        const newHoleCards = [...holeCards];
        newHoleCards[index] = value;
        setHoleCards(newHoleCards);
    };

    const handlePlayerActionChange = (index, action, bet) => {
        const newPlayerActions = [...playerActions];
        newPlayerActions[index] = { action, bet };
        setPlayerActions(newPlayerActions);
    };

    const calculateEquity = () => {
        return {
            handRange: "2 Pair, Top Pair, Flush Draw",
            possibleActions: ["Check", "Call", "Raise"],
            equity: 0.45,
        };
    };

    const { handRange, equity } = calculateEquity();

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Table Setup</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="num-players">Number of Players</Label>
                            <Select
                                id="num-players"
                                value={numPlayers}
                                onChange={(e) => handleNumPlayersChange(e.target.value)}
                            >
                                <option value={6}>6 Players</option>
                                <option value={9}>9 Players</option>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Board Cards</Label>
                            <div className="grid grid-cols-5 gap-2">
                                {boardCards.map((card, index) => (
                                    <Input
                                        key={index}
                                        placeholder={`Card ${index + 1}`}
                                        value={card}
                                        onChange={(e) => handleBoardCardChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Your Hole Cards</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {holeCards.map((card, index) => (
                                    <Input
                                        key={index}
                                        placeholder={`Card ${index + 1}`}
                                        value={card}
                                        onChange={(e) => handleHoleCardChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Player Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {playerActions.map((action, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2">
                                <Label htmlFor={`player-${index}-action`}>
                                    Player {index + 1}
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handlePlayerActionChange(index, "fold", 0)}
                                    >
                                        Fold
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handlePlayerActionChange(index, "call", action.bet)}
                                    >
                                        Call
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => handlePlayerActionChange(index, "raise", action.bet)}
                                        >
                                            Raise
                                        </Button>
                                        <Input
                                            type="number"
                                            placeholder="Bet"
                                            className="w-20"
                                            value={action.bet}
                                            onChange={(e) => handlePlayerActionChange(index, action.action, e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Your Hand Range</Label>
                        <div className="bg-muted rounded-md p-4 text-muted-foreground">
                            {handRange}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Possible Actions</Label>
                        <div className="bg-muted rounded-md p-4 text-muted-foreground grid grid-cols-3 gap-2">
                            <Button variant="outline">Fold</Button>
                            <Button variant="outline">Call</Button>
                            <Button variant="outline">Raise</Button>
                            <Input type="number" placeholder="Bet" className="w-20" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Equity</Label>
                        <div className="bg-muted rounded-md p-4 text-muted-foreground">
                            {(equity * 100).toFixed(2)}%
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
