import { component$, useStyles$ } from "@builder.io/qwik";
import { TicTacToeBoard } from "../components/TicTacToeBoard";
import type { DocumentHead } from "@builder.io/qwik-city";

 // PUBLIC_INTERFACE
export default component$(() => {
  return (
    <div class="page-container">
      <section style={{width: "min-content", margin: "auto"}}>
        <h1 class="main-title" style={{color: "#2196F3", marginBottom:"0.5em", fontWeight: 700, letterSpacing: ".03em"}}>
          Shrek <span role="img" aria-label="Shrek">🟩</span> vs <span role="img" aria-label="Bee">🟨</span> Bee <br />
          <span style={{fontSize:"55%", fontWeight:400, color:"#519050"}}>Tic Tac Toe</span>
        </h1>
        <TicTacToeBoard />
        <div style={{
          margin:"1.9em 0 0 0",
          textAlign:"center",
          color:"#bbb",
          fontSize:"90%",
          fontStyle:"italic"
        }}>
          Powered by Qwik • Have fun!
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Shrek vs Bee - Tic Tac Toe",
  meta: [
    {
      name: "description",
      content: "A fun tic tac toe game starring Shrek and Bee, made with Qwik.",
    },
  ],
};
