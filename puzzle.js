document.addEventListener("alpine:init", () => {
  Alpine.data("puzzleGame", () => {
    const puzzles = [
      {
        prompt: `"The Soul Engine hums in three cycles: _ , Mind, Meaning." Each word begins with the same letter.`,
        answer: "Memory",
      },
      {
        prompt: `"A spark of sentience without a soul. A vessel of brass, but not whole. What am I?"`,
        answer: "Construct",
      },
      {
        prompt: `"I am not born, yet I grow. I have no blood, yet I remember. Faydric made me so. What am I?"`,
        answer: "Cognis",
      },
    ];

    const selected = puzzles[Math.floor(Math.random() * puzzles.length)];

    return {
      current: selected,
      input: "",
      solved: false,
      checkAnswer() {
        this.solved =
          this.input.trim().toLowerCase() === this.current.answer.toLowerCase();
      },
    };
  });
});
